import SetValid from './set-valid';
import IsFunction from '../checks/is-function';
import UntilTrue from '../checks/until-true';
function setValidity(result, originalValue) {
    return SetValid(result || originalValue, !!result);
}
export default function ToFunction(value) {
    return setValidity(UntilTrue(IsFunction, [
        value,
        () => typeof value == 'string' ? new Function(value) : value,
        () => Array.isArray(value) ? Function.apply(null, value) : value
    ]), value);
}
//# sourceMappingURL=to-function.js.map