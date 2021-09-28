export default function WalkUp(parent, checkFn) {
    let foundElement;
    while (!foundElement && parent && parent !== document.body) {
        if (checkFn(parent)) {
            foundElement = parent;
        }
        parent = parent.parentNode;
    }
    return foundElement;
}
//# sourceMappingURL=walk-up.js.map