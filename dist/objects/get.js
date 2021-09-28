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
export default function Get(obj, path, emptyVal, modifyFn = emptyModifyFn) {
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
//# sourceMappingURL=get.js.map