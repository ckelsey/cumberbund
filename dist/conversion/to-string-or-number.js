export default function ToStringOrNumber(arg) {
    const argNumber = parseFloat(arg);
    return !isNaN(arg) ? arg.trim() : argNumber;
}
//# sourceMappingURL=to-string-or-number.js.map