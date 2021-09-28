function cloneArray(array) {
    const result = [];
    let index;
    for (index = 0; index < array.length; index += 1) {
        result[index] = CloneObject(array[index]);
    }
    return result;
}
function cloneObject(object) {
    const result = {};
    let index;
    for (index in object) {
        if (object.hasOwnProperty(index)) {
            result[index] = CloneObject(object[index]);
        }
    }
    return result;
}
export default function CloneObject(object) {
    if (!object || typeof object !== 'object')
        return object;
    if (Object.prototype.toString.apply(object) === '[object Array]') {
        return cloneArray(object);
    }
    return cloneObject(object);
}
//# sourceMappingURL=clone.js.map