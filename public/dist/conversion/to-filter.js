import SetValid from './set-valid';
import ToArray from './to-array';
export default function ToFilter(fn, value) {
    function ToFilterFn(array) {
        const isArray = Array.isArray(array);
        return SetValid(!isArray ? array : array.filter(fn), isArray);
    }
    function ToFilterPartial(v) {
        return ToFilterFn(ToArray(v));
    }
    if (arguments.length === 1) {
        return ToFilterPartial;
    }
    return ToFilterPartial(ToArray(value));
}
//# sourceMappingURL=to-filter.js.map