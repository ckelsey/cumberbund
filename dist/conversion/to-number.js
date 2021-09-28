import SetValid from './set-valid';
export default function ToNumber(value) {
    const result = Number(value);
    const isNumber = !isNaN(result);
    return SetValid(isNumber ? result : value, isNumber);
}
//# sourceMappingURL=to-number.js.map