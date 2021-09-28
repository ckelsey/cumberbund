import SetValid from '../conversion/set-valid';
import Try from '../try';
export default function IndexOf(array, value) {
    function IndexOfPartial(v) {
        return SetValid(v, Try(() => Array.from(array).indexOf(v) > -1));
    }
    if (arguments.length === 1) {
        return IndexOfPartial;
    }
    return IndexOfPartial(value);
}
//# sourceMappingURL=index-of.js.map