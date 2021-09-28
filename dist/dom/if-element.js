export default function IfElement(root, selector, then = result => result, otherwise = () => { }) {
    if (!root || !selector) {
        return otherwise();
    }
    const element = root.querySelector(selector);
    return element ? then(element) : otherwise();
}
//# sourceMappingURL=if-element.js.map