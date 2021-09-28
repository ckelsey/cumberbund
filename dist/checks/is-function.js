export default function IsFunction(val) {
    return !!val && {}.toString.call(val) == '[object Function]';
}
//# sourceMappingURL=is-function.js.map