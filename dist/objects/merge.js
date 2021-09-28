import Type from '../types/type';
export default function Merge(sourceObject, newObject) {
    const sourceType = Type(sourceObject);
    const newType = Type(newObject);
    const mergeableTypes = ['object', 'array'];
    if (mergeableTypes.indexOf(sourceType) == -1 || mergeableTypes.indexOf(newType) == -1 || sourceType !== newType) {
        return newObject === undefined ? sourceObject : newObject;
    }
    function doMerge(target, currentKey) {
        if (mergeableTypes.indexOf(newObject[currentKey]) == -1) {
            target[currentKey] = newObject[currentKey];
        }
        else {
            target[currentKey] = Merge(target[currentKey], newObject[currentKey]);
        }
        return target;
    }
    if (sourceType == 'object') {
        return Object.keys(newObject).reduce(doMerge, sourceObject);
    }
    if (sourceType == 'array') {
        return newObject.reduce(doMerge, sourceObject);
    }
    return sourceObject;
}
//# sourceMappingURL=merge.js.map