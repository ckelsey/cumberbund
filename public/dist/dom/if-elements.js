import ArrayFrom from "../conversion/array-from";
export default function IfElements(root, selector, then = result => result, otherwise = () => { }) {
    if (!root || !selector) {
        return otherwise();
    }
    const elements = ArrayFrom(root.querySelectorAll(selector));
    if (!elements.length) {
        return otherwise();
    }
    else {
        then(elements);
    }
}
//# sourceMappingURL=if-elements.js.map