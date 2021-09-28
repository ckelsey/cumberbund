import Observer, { ObserverInstance } from '../../observe/observer'

export interface ComponentState {
    initialValue: any
    matchType?: boolean
    isAttribute?: boolean
    formatter?: (value: any, observerInstance?: ObserverInstance) => any
    onChange?: (value: any, observerInstance?: ObserverInstance) => any
}

export type ComponentStateObject = { [key: string]: ComponentState }

export type PropertiesObject = { [key: string]: PropertyDescriptor & ThisType<any> }

export interface ComponentConfig {
    selector: string
    template: string
    style?: string
    state?: ComponentStateObject
    connectedCallback?: () => void
    disconnectedCallback?: () => void
    properties?: PropertiesObject
}

function registerComponent(name: string, component: CustomElementConstructor) { return customElements.define(name, component) }

function getTemplate(html: string = '<div></div>', style: string = '') {
    const template = document.createElement('template')

    if (style) {
        html = `<style>${style}</style> ${html}`
    }

    template.innerHTML = html

    return template
}

function initialValue(host: any, key: string, state: ComponentState) {
    const attrValue = host.getAttribute(key)
    if (attrValue !== null) { return attrValue }
    return state.initialValue
}

export default function CreateComponent(config: ComponentConfig): any {
    console.log('Create', config)
    const stateKeys = Object.keys(config.state || {})
    const observedAttributes = stateKeys.filter(key => config.state && !!config.state[key].isAttribute)
    const template = getTemplate(config.template, config.style)

    class ComponentClass extends HTMLElement {
        static get observedAttributes() { return observedAttributes }

        constructor() {
            super()

            const clone = document.importNode(template.content, true);
            this.attachShadow({ mode: 'open' }).appendChild(clone)

            if (config.state) {
                this.state = Object.freeze(stateKeys.reduce(
                    (result: any, key: string) => {
                        if (!config.state) { return result }

                        return Object.assign(result, {
                            [key]: Observer(initialValue(this, key, config.state[key]),
                                {
                                    matchType: config.state[key].matchType === undefined ? true : config.state[key].matchType,
                                    formatter: config.state[key].formatter
                                }
                            )
                        })
                    },
                    {}
                ))

                stateKeys.forEach(key => {
                    if (!config.state) { return }
                    if (config.state[key].isAttribute) {
                        const getter = function (this: { get: () => any; enumerable: true }) {
                            return (this as any).state[key].value
                        }
                        const setter = function (this: { get: (this: { get: () => any; enumerable: true }) => any; set: (value: any) => void; enumerable: true }, value: any) {
                            (this as any).state[key].next(value)
                        }
                        Object.defineProperty(this, key, {
                            get: getter,
                            set: setter,
                            enumerable: true
                        })
                    }

                    if (typeof config.state[key].onChange === 'function') {
                        this.state[key].subscribe((value, observer) => ((config.state as any)[key].onChange as any).apply(this, [value, observer]))
                    }
                })
            }
        }

        state: { [key: string]: ObserverInstance } = {}

        attributeChangedCallback(attrName: string, _oldValue: any, newValue: any) {
            if (this.state[attrName]) { this.state[attrName].next(newValue) }
        }

        connectedCallback() {
            // setup elements
            // setup events

            if (typeof config.connectedCallback === 'function') { config.connectedCallback.call(this) }
        }

        disconnectedCallback() {
            // remove events
            if (typeof config.disconnectedCallback === 'function') { config.disconnectedCallback.call(this) }
        }
    }

    const propertyKeys = Object.keys(config.properties || {})
    console.log('propertyKeys', propertyKeys)

    if (propertyKeys.length) {
        propertyKeys.forEach(key => {
            console.log('define', key, config.properties[key])
            Object.defineProperty(ComponentClass, key, config.properties[key])
        })
    }

    registerComponent(config.selector, ComponentClass)

    return ComponentClass
}