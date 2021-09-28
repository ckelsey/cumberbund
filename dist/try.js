export default function Try(fn, elseFn = () => { }) {
    try {
        return fn();
    }
    catch (error) {
        try {
            return fn.apply(null);
        }
        catch (error) {
            if (typeof elseFn !== 'function') {
                return elseFn;
            }
            return elseFn();
        }
    }
}
//# sourceMappingURL=try.js.map