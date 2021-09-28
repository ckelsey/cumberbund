import Get from "../objects/get";
export default function Manipulate(el, options = {}) {
    if (!el || (!(el instanceof HTMLElement) && !(el instanceof Node))) {
        return;
    }
    const properties = Get(options, 'properties', {});
    const attributes = Get(options, 'attributes', {});
    let noDisplayStyle = !Get(el, 'style.display');
    if (noDisplayStyle) {
        el.style.display = 'none';
    }
    for (const prop in properties) {
        el[prop] = properties[prop];
    }
    for (const attr in attributes) {
        el.setAttribute(attr, attributes[attr]);
    }
    if (noDisplayStyle) {
        el.style.removeProperty('display');
    }
}
//# sourceMappingURL=manipulate.js.map