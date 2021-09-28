import SetAttribute from "./set-attribute";
export default function InputLabelId(id, input, label) {
    SetAttribute(input, 'id', id);
    SetAttribute(label, 'for', id);
}
//# sourceMappingURL=input-label-id.js.map