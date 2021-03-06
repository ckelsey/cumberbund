import ArrayFrom from "../conversion/array-from";
import RemoveElement from "./remove-element";
export default function RemoveChildren(el) {
    if (!el) {
        return el;
    }
    ArrayFrom(el.children || []).forEach(RemoveElement);
    return el;
}
//# sourceMappingURL=remove-children.js.map