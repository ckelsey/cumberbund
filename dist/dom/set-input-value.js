import Pipe from '../function-helpers/pipe';
import ToBool from '../conversion/to-bool';
import IfInvalid from '../checks/if-invalid';
export default function SetInputValue(input, value) {
    if (!input) {
        return;
    }
    const type = input.type;
    if (type === 'checkbox' || type === 'radio') {
        return input.checked = Pipe(ToBool, IfInvalid(false))(value);
    }
    return input.value = value;
}
//# sourceMappingURL=set-input-value.js.map