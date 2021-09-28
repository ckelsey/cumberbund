import Get from '../objects/get';
export default function Select(selector, root = document.body) {
    return Get(root, `querySelectorAll(${selector})`);
}
//# sourceMappingURL=select.js.map