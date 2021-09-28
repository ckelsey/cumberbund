import ArrayFrom from '../conversion/array-from';
export default function SelectAll(selector, root = document.body) {
    return ArrayFrom(root.querySelectorAll(selector));
}
//# sourceMappingURL=select-all.js.map