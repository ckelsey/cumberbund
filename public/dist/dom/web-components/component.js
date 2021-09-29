import Observer from '../../observe/observer';
function registerComponent(name, component) { return customElements.define(name, component); }
function getTemplate(html = '<div></div>', style = '') {
    const template = document.createElement('template');
    if (style) {
        html = `<style>${style}</style> ${html}`;
    }
    template.innerHTML = html;
    return template;
}
function initialValue(host, key, state) {
    const attrValue = host.getAttribute(key);
    if (attrValue !== null) {
        return attrValue;
    }
    return state.initialValue;
}
export default function CreateComponent(config) {
    const stateKeys = Object.keys(config.state || {});
    const observedAttributes = stateKeys.filter(key => config.state && !!config.state[key].isAttribute);
    const template = getTemplate(config.template, config.style);
    class ComponentClass extends HTMLElement {
        static get observedAttributes() { return observedAttributes; }
        constructor() {
            super();
            const clone = document.importNode(template.content, true);
            this.attachShadow({ mode: 'open' }).appendChild(clone);
            const propertyKeys = Object.keys(config.properties || {});
            if (propertyKeys.length) {
                propertyKeys.forEach(key => {
                    if (typeof config.properties[key].value === 'function') {
                        config.properties[key].value = config.properties[key].value.bind(this);
                    }
                    Object.defineProperty(this, key, config.properties[key]);
                });
            }
            if (config.state) {
                this.state = Object.freeze(stateKeys.reduce((result, key) => {
                    if (!config.state) {
                        return result;
                    }
                    return Object.assign(result, {
                        [key]: Observer(initialValue(this, key, config.state[key]), {
                            matchType: config.state[key].matchType,
                            formatter: config.state[key].formatter
                        })
                    });
                }, {}));
                stateKeys.forEach(key => {
                    if (!config.state) {
                        return;
                    }
                    if (config.state[key].isAttribute) {
                        const getter = function () {
                            return this.state[key].value;
                        };
                        const setter = function (value) {
                            this.state[key].next(value);
                        };
                        Object.defineProperty(this, key, {
                            get: getter,
                            set: setter,
                            enumerable: true
                        });
                    }
                    if (typeof config.state[key].onChange === 'function') {
                        this.state[key].subscribe((value, observer) => config.state[key].onChange.apply(this, [value, observer]));
                    }
                });
            }
        }
        state = {};
        attributeChangedCallback(attrName, _oldValue, newValue) {
            if (this.state[attrName]) {
                this.state[attrName].next(newValue);
            }
        }
        connectedCallback() {
            // setup elements
            // setup events
            if (typeof config.connectedCallback === 'function') {
                config.connectedCallback.call(this);
            }
        }
        disconnectedCallback() {
            // remove events
            if (typeof config.disconnectedCallback === 'function') {
                config.disconnectedCallback.call(this);
            }
        }
    }
    registerComponent(config.selector, ComponentClass);
    return ComponentClass;
}
//# sourceMappingURL=component.js.map