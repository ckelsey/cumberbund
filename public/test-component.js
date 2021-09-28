let index = 0;
function doId(indx) {
    return doHash() + indx;
}
function doHash() {
    return (performance.now() + 'xxxxxxxxxxxxxxxx')
        .replace(/[x]|\./g, function () {
        return (Math.random() * 16 | 0).toString(16);
    });
}
function ID() {
    index = index + 1;
    return doId(index);
}

/**
 * Determines if a value is not a collection
 * @function IsNonCollection
 * @param {any} value - The value to test
 * @return {boolean} Whether or not the value is a collection
 * @example
 * IsNonCollection({}) // false
 * IsNonCollection([]) // false
 * IsNonCollection('') // true
 * IsNonCollection(1) // true
 * IsNonCollection(null) // true
 * IsNonCollection(undefined) // true
 * IsNonCollection(()=>{}) // true
 * IsNonCollection(true) // true
 */
const nonCollections = ['string', 'number', 'null', 'undefined', 'function', 'boolean', 'date'];
function IsNonCollection(value) { return nonCollections.indexOf(typeof value) > -1 || value === null || value instanceof Date; }

/**
 * Determines if a value is a valid DOM element
 * @function IsDom
 * @param {any} value - The value to test
 * @return {boolean} If the value is a DOM element
 * @example
 * const element = document.createElement('div')
 * IsDom(element) // true
 * IsDom('nope') // false
 */
var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
function IsDom(value) {
    if (!isBrowser()) {
        return false;
    }
    return (value instanceof Element) || (value instanceof Node);
}

/**
 * Determines if a value is or can be a valid date
 * @function IsDate
 * @param {any} value - The value to test
 * @return (boolean) If the value is a valid date
 * @example
 * IsDate('Mon Nov 18 2019 07:41:48 GMT-0800') // true
 * IsDate('Not a date') // false
 */
function IsDate(value) {
    if (typeof value === 'string' && parseFloat(value).toString() === value) {
        return false;
    } // i.e. 222 is a date, but we don't want that
    const tempValue = new Date(Date.parse(value));
    return (tempValue !== 'Invalid Date'
        && !isNaN(tempValue)
        && tempValue instanceof Date);
}

/**
 * Determines if the value is an object
 * @function IsObject
 * @param {any} value
 * @return {boolean} Whether or not the value is an object
 * @example
 * IsObject() // false
 * IsObject(()=>{}) // false
 * IsObject('') // false
 * IsObject(true) // false
 * IsObject(null) // false
 * IsObject(new Date()) // false
 * IsObject([]) // false
 * IsObject({}) // true
 */
function IsObject(value) {
    return (typeof value).indexOf('object') > -1 && value !== null && !Array.isArray(value) && !(value instanceof Date);
}

function Type(value) {
    return value === null ?
        'null' :
        IsNonCollection(value) ?
            typeof value === 'string' ?
                'string' :
                !isNaN(value) ?
                    'number' :
                    IsDate(value) ?
                        'date' :
                        typeof value :
            IsDom(value) ?
                'dom' :
                Array.isArray(value) ?
                    'array' :
                    IsObject(value) ?
                        'object' :
                        typeof value;
}

function Equals(value1, value2) {
    const type = Type(value1);
    if (Type(value2) !== type) {
        return false;
    }
    if (IsNonCollection(value1)) {
        if (type === 'date') {
            let d = value1 === value2;
            d = new Date(value1).getTime() === new Date(value2).getTime();
            return d;
        }
        return value2 === value1;
    }
    if (type === 'boolean' && value1 !== value2) {
        return false;
    }
    if (type === 'array' && value1.length !== value2.length) {
        return false;
    }
    if (type === 'object' && Object.keys(value1).length !== Object.keys(value2).length) {
        return false;
    }
    if (type === 'object' && value1.constructor !== value2.constructor) {
        return false;
    }
    if (type === 'dom') {
        // return value1.isEqualNode(value2) // 2 different but similar nodes returns true
        return value1.isSameNode(value2);
    }
    // Start walking
    if (type === 'array') {
        let len = value1.length;
        while (len--) {
            if (!Equals(value1[len], value2[len])) {
                return false;
            }
        }
    }
    if (type === 'object') {
        const keys = Object.keys(value1);
        let len = keys.length;
        while (len--) {
            if (!Equals(value1[keys[len]], value2[keys[len]])) {
                return false;
            }
        }
    }
    return true;
}

const Debounce = (func, wait = 33, immediate = false) => {
    let timer = 0;
    const _this = undefined;
    return function () {
        const context = _this;
        const args = arguments;
        const callNow = immediate && !timer;
        const later = function () {
            timer = requestAnimationFrame(function () {
                timer = 0;
                if (!immediate)
                    func.apply(context, args);
            });
        };
        clearTimeout(timer);
        cancelAnimationFrame(timer);
        timer = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
};

function toStringOrNumber(arg) {
    const argNumber = parseFloat(arg);
    return !isNaN(arg) ? arg.trim() : argNumber;
}
function emptyModifyFn(v) {
    return v;
}
function getFunctionParams(str = '') {
    const result = /\((.*?)\)/g.exec(str || '');
    return result ? result[1] : '';
}
function Get(obj, path, emptyVal, modifyFn = emptyModifyFn) {
    /** If nothing to search, return */
    if (!obj) {
        return modifyFn(emptyVal);
    }
    /** The search array, initial search item being the source */
    const pathParts = path.split('.');
    let result = obj;
    const count = pathParts.length;
    let loopIndex = pathParts.length;
    while (loopIndex) {
        if (result === undefined || result === null) {
            result = emptyVal;
            break;
        }
        const partIndex = count - loopIndex;
        const startParens = /\(/.exec(pathParts[partIndex]);
        if (startParens) {
            const fn = result[pathParts[partIndex].slice(0, startParens.index)];
            if (typeof fn === 'function') {
                result = fn.apply(result, getFunctionParams(pathParts[partIndex])
                    .split(',')
                    .map(toStringOrNumber));
                loopIndex = loopIndex - 1;
                continue;
            }
        }
        result = result[pathParts[partIndex]];
        loopIndex = loopIndex - 1;
    }
    /** If nothing was found return emptyVal */
    if (result === undefined || result === null) {
        result = emptyVal;
    }
    return modifyFn(result);
}

function isEmpty(toCheck) {
    if (toCheck === undefined) {
        return true;
    }
    if (typeof toCheck === 'object' && Object.keys(toCheck).length === 0) {
        return true;
    }
    return false;
}
function Diff(sourceObject, compareObject) {
    const differences = {};
    const sourceType = Type(sourceObject);
    const compareType = Type(compareObject);
    const validTypes = ['object', 'array'];
    if (validTypes.indexOf(sourceType) == -1 || validTypes.indexOf(compareType) == -1) {
        return sourceObject !== compareObject ? compareObject === undefined ? sourceObject : compareObject : undefined;
    }
    if (sourceType !== compareType) {
        return compareType == 'undefined' && sourceType !== 'undefined' ? sourceObject : compareObject;
    }
    function doCompare(index) {
        if (differences[index]) {
            return;
        }
        const compared = Diff(sourceObject[index], compareObject[index]);
        if (!isEmpty(compared)) {
            differences[index] = sourceObject[index] === compared ? undefined : compared;
        }
    }
    if (sourceType == 'object') {
        Object.keys(sourceObject).forEach(doCompare);
        Object.keys(compareObject).forEach(doCompare);
    }
    if (sourceType == 'array') {
        sourceObject.forEach((_v, index) => doCompare(index));
        compareObject.forEach((_v, index) => doCompare(index));
    }
    return differences;
}

const observers = new WeakMap();
const observerKeys = {};
window.observers = () => ({
    map: observers,
    keys: Object.keys(observerKeys)
});
const emptyFn = () => { };
function Observer(initialValue, options = {}) {
    let _this = [ID()];
    observerKeys[_this[0]] = _this;
    const noInit = options.noInit ? true : false;
    const nextOnNew = options.nextOnNew === false ? false : true;
    const matchType = options.matchType ? true : false;
    const onSubscribe = options.onSubscribe && typeof options.onSubscribe === 'function' ? options.onSubscribe : (val) => val;
    const formatter = options.formatter && typeof options.formatter === 'function' ? options.formatter : (val) => val;
    initialValue = formatter(initialValue);
    const initialType = Type(initialValue);
    const takeFirst = !!options.takeFirst;
    const takeLast = !!options.takeLast;
    const debounced = !!takeFirst || !!takeLast;
    const takeBy = options.takeBy || 0;
    const getInstance = () => observers.get(_this);
    const formatValue = (toFormat, obs = {}) => {
        const f = formatter(toFormat, obs);
        const inst = getInstance();
        return inst && matchType && Type(f) !== initialType ? inst.data.value : f;
    };
    const states = [initialValue];
    const addedRemovedReducer = (source) => (target, current) => {
        if (source.indexOf(current) === -1) {
            target.push(current);
        }
        return target;
    };
    const bothArray = (source, target) => Array.isArray(source) && Array.isArray(target);
    function getAddedRemoved(source, target) {
        return !bothArray(source, target) ? [] : source.reduce(addedRemovedReducer(target), []);
    }
    function getRemoved() {
        const inst = getInstance();
        return inst && inst.data ?
            getAddedRemoved(inst.data.previousValue, inst.data.value) :
            [];
    }
    function getAdded() {
        const inst = getInstance();
        return inst && inst.data ? getAddedRemoved(inst.data.value, inst.data.previousValue) : [];
    }
    function destroy() {
        const inst = getInstance();
        if (!inst) {
            return;
        }
        inst.trigger('destroy', inst.data);
        Object.keys(inst.data.subscriptions).forEach(k => Get(inst.data, `subscriptions.${k}.unsubscribe`, emptyFn));
        inst.data.isComplete = true;
        delete observerKeys[_this[0]];
        observers.delete(_this);
        _this = null;
    }
    const callFn = (val, valuesObj, functionKey, subscriptions) => (id) => {
        const fn = Get(subscriptions, `${id}.${functionKey}`);
        typeof fn === 'function' ? fn(val, valuesObj || {}, id) : undefined;
    };
    function doLoop(functionKey, val, valuesObj) {
        const inst = getInstance();
        if (!inst) {
            return;
        }
        inst.trigger(functionKey, valuesObj || {});
        const subs = inst.data.subscriptions;
        Object.keys(subs).forEach(callFn(val, valuesObj, functionKey, subs));
        if (functionKey === 'complete') {
            destroy();
        }
    }
    const debouncedLoop = Debounce(doLoop, takeBy, !!takeFirst);
    const loop = !debounced ? doLoop : debouncedLoop;
    function unsubscribe(subscription) {
        return function unsubscribeInner() {
            const inst = getInstance();
            if (!inst) {
                return;
            }
            const subscriptions = inst.data.subscriptions;
            delete subscriptions[subscription.id];
            inst.trigger('unsubscribe', { subscription, subscriptions });
            if (inst.data.noSubsComplete && Object.keys(subscriptions).length === 0) {
                destroy();
            }
        };
    }
    function getArrayIndexOf(element, isArray) {
        const inst = getInstance();
        if (!inst || !isArray) {
            return;
        }
        const index = inst.data.value.indexOf(element);
        return index > -1 ? index : undefined;
    }
    function getObjectKey(value) {
        let _result;
        const inst = getInstance();
        if (!inst) {
            return;
        }
        const dataVal = inst.data.value;
        const keys = Object.keys(dataVal);
        let i = keys.length;
        while (i--) {
            if (value === dataVal[keys[i]]) {
                _result = keys[i];
                break;
            }
        }
        return _result;
    }
    function getValTypes(inst) {
        inst = inst || getInstance();
        const value = Get(inst, 'data.value');
        return inst ? {
            value,
            isArray: Array.isArray(value),
            isString: typeof value === 'string'
        } : {};
    }
    let result = {
        get isComplete() {
            const inst = getInstance();
            if (!inst) {
                return true;
            }
            return inst.data.isComplete;
        },
        get value() {
            const inst = getInstance();
            if (!inst) {
                return;
            }
            return inst.data.value;
        },
        get previous() {
            const inst = getInstance();
            if (!inst) {
                return;
            }
            return inst.data.previousValue;
        },
        get subscriptions() {
            const inst = getInstance();
            if (!inst) {
                return;
            }
            return inst.data.subscriptions;
        },
        get lastUpdate() {
            const inst = getInstance();
            if (!inst) {
                return;
            }
            return inst.data.updated;
        },
        get settings() {
            return {
                initialType,
                formatter,
                matchType,
                nextOnNew,
                noInit,
                takeFirst,
                takeLast,
                takeBy
            };
        },
        get removed() { return getRemoved(); },
        get added() { return getAdded(); },
        get changed() {
            const inst = getInstance();
            if (!inst) {
                return [];
            }
            return Diff(inst.data.previousValue, inst.data.value);
        },
        next: function (v, force) {
            const inst = getInstance();
            if (!inst) {
                return;
            }
            const formatted = formatValue(v, inst);
            if (!force && nextOnNew && Equals(formatted, inst.data.value)) {
                return;
            }
            inst.data.value = formatted;
            inst.data.updated = new Date().getTime();
            loop('next', inst.data.value, inst.data);
            return inst.data;
        },
        error: function (err) {
            const inst = getInstance();
            if (!inst) {
                return;
            }
            inst.data.errors = inst.data.errors.concat([err]);
            inst.data.updated = new Date().getTime();
            loop('error', err, inst.data);
            inst.complete();
        },
        complete: function () {
            const inst = getInstance();
            if (!inst) {
                return;
            }
            loop('complete', inst.data);
        },
        subscribe: function (next, error = (_err) => { }, complete = emptyFn) {
            const inst = getInstance();
            if (!inst) {
                return () => { };
            }
            const subscription = Object.assign({}, {
                next: next,
                error: error,
                complete: complete,
                id: ID()
            });
            subscription.unsubscribe = unsubscribe(subscription);
            inst.data.subscriptions[subscription.id] = subscription;
            if (!noInit && inst.data.value !== undefined && typeof subscription.next === 'function') {
                subscription.next(inst.data.value);
            }
            onSubscribe(subscription);
            return unsubscribe(subscription);
        },
        unsubscribe: function (subscription) {
            const inst = getInstance();
            if (!inst || !subscription || !subscription.id || !inst.data.subscriptions[subscription.id]) {
                return;
            }
            return unsubscribe(subscription);
        },
        insert: function (element, index) {
            const inst = getInstance();
            if (!inst) {
                return;
            }
            const valData = getValTypes(inst);
            index = index == undefined ? Get(valData, 'value.length', 0) : index;
            if (valData.isArray) {
                valData.value.splice(index, index !== valData.value.length ? 1 : 0, element);
                return inst.next(valData.value, true);
            }
            if (typeof valData.value === 'string') {
                valData.value = valData.value.slice(0, index) + element + valData.value.slice(index);
                return inst.next(valData.value, true);
            }
            valData.value[index] = element;
            return inst.next(valData.value, true);
        },
        insertAll: function (elements, index) {
            const inst = getInstance();
            if (!inst) {
                return;
            }
            const valData = getValTypes(inst);
            index = index == undefined ? Get(valData, 'value.length', 0) : index;
            if (valData.isArray) {
                if (!Array.isArray(elements)) {
                    return;
                }
                valData.value.splice.apply(valData.value, [index, index !== valData.value.length ? 1 : 0, ...elements]);
                return inst.next(valData.value, true);
            }
            const elementsObject = elements;
            Object.keys(elementsObject).forEach(elementKey => inst.data.value[elementKey] = elementsObject[elementKey]);
            return inst.next(valData.value, true);
        },
        remove: function (element, index, all = false) {
            const inst = getInstance();
            if (!inst) {
                return;
            }
            const valData = getValTypes(inst);
            if (index === undefined) {
                index = getArrayIndexOf(element, valData.isArray);
            }
            if (index === undefined && valData.isArray) {
                return valData.value;
            }
            if (index === undefined && valData.isString) {
                return inst.next(valData.value.replace(new RegExp(element, all ? 'gm' : ''), ''), true);
            }
            if (index !== undefined) {
                if (valData.isArray) {
                    valData.value.splice(index, 1);
                }
                else if (valData.isString) {
                    inst.data.value = valData.value.slice(0, index);
                }
                else {
                    inst.data.value[index] = undefined;
                    delete inst.data.value[index];
                }
                return inst.next(valData.value, true);
            }
            const objectKey = getObjectKey(element);
            if (objectKey !== undefined) {
                inst.data.value[objectKey] = null;
                delete inst.data.value[objectKey];
                return inst.next(inst.data.value, true);
            }
            return inst.next(inst.data.value, true);
        },
        removeElements: function (elements) {
            const inst = getInstance();
            if (!inst) {
                return;
            }
            const valData = getValTypes(inst);
            if (valData.isArray) {
                for (let i = 0; i < elements.length; i = i + 1) {
                    const index = valData.value.indexOf(elements[i]);
                    if (index > -1) {
                        valData.value.splice(index, 1);
                    }
                }
                return inst.next(valData.value, true);
            }
            Object.keys(elements).forEach(prop => delete valData.value[prop]);
            return inst.next(valData.value, true);
        },
        reverse: function () {
            const inst = getInstance();
            if (!inst) {
                return;
            }
            const valData = getValTypes(inst);
            if (valData.isArray) {
                return inst.next(valData.value.reverse(), true);
            }
            if (valData.isString) {
                return inst.next(valData.value.split('').reverse(), true);
            }
            inst.next(valData.value, true);
        },
        has: function has(value) {
            const valData = getValTypes();
            if (valData.isArray) {
                return getArrayIndexOf(value, valData.isArray) || false;
            }
            if (valData.isString) {
                return valData.value.indexOf(value) > -1;
            }
            const objectKey = getObjectKey(value);
            if (objectKey !== undefined) {
                return true;
            }
            return false;
        },
        indexOf: function indexOf(value) {
            const valData = getValTypes();
            if (valData.isArray) {
                return getArrayIndexOf(value, valData.isArray) || -1;
            }
            if (valData.isString) {
                return valData.value.indexOf(value);
            }
            return getObjectKey(value) || -1;
        },
        on: function on(name, callback) {
            const inst = getInstance();
            if (!inst) {
                return () => { };
            }
            if (!inst.data.eventCallbacks[name]) {
                observers.get(_this).data.eventCallbacks[name] = {};
            }
            const id = ID();
            observers.get(_this).data.eventCallbacks[name][id] = callback;
            return () => delete observers.get(_this).data.eventCallbacks[name][id];
        },
        trigger: function trigger(name, data) {
            const inst = getInstance();
            if (!inst) {
                return;
            }
            const callbacks = inst.data.eventCallbacks[name];
            if (!callbacks) {
                return;
            }
            Object.keys(callbacks).forEach(prop => callbacks[prop](data));
        },
        data: {
            errors: [],
            updated: new Date().getTime(),
            subscriptions: {},
            isComplete: false,
            initialType,
            initialValue,
            eventCallbacks: {},
            formatter,
            matchType,
            nextOnNew,
            noInit,
            noSubsComplete: options.noSubsComplete === true ? true : false,
            takeFirst,
            takeLast,
            value: null,
            previousValue: null
        }
    };
    observers.set(_this, result);
    Object.defineProperties(getInstance().data, {
        value: {
            get() {
                return states[0];
            },
            set(v) {
                states.unshift(v);
                while (states.length > 2) {
                    states.pop();
                }
            }
        },
        previousValue: {
            get() {
                return states[1];
            }
        }
    });
    return getInstance();
}

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
function CreateComponent(config) {
    const stateKeys = Object.keys(config.state || {});
    const observedAttributes = stateKeys.filter(key => config.state && !!config.state[key].isAttribute);
    const template = getTemplate(config.template, config.style);
    class Component extends HTMLElement {
        static get observedAttributes() { return observedAttributes; }
        constructor() {
            super();
            const clone = document.importNode(template.content, true);
            this.attachShadow({ mode: 'open' }).appendChild(clone);
            if (config.state) {
                this.state = Object.freeze(stateKeys.reduce((result, key) => {
                    if (!config.state) {
                        return result;
                    }
                    return Object.assign(result, {
                        [key]: Observer(initialValue(this, key, config.state[key]), {
                            matchType: config.state[key].matchType === undefined ? true : config.state[key].matchType,
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
    registerComponent(config.selector, Component);
    return Component;
}

const TestComponent = CreateComponent({
    selector: 'test-component',
    template: '<div>Yep, here is some text: <div class="text-content"></div></div>',
    style: 'div{color:red;}',
    connectedCallback: function () {
        console.log('connectedCallback', this);
    },
    state: {
        text: {
            initialValue: 'Hello!',
            matchType: true,
            isAttribute: true,
            onChange: function (value) {
                const host = this;
                if (host.shadowRoot) {
                    console.log(value);
                    host.shadowRoot.querySelector('.text-content').textContent = value;
                }
                else {
                    console.log('no shadow', this);
                }
            }
        }
    }
});

export { TestComponent as default };
//# sourceMappingURL=test-component.js.map
