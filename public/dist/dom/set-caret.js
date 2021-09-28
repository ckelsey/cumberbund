export default function SetCaret(el, start) {
    const range = document.createRange();
    const sel = window.getSelection();
    if (!sel) {
        return el;
    }
    range.setStart(el, start);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    return el;
}
//# sourceMappingURL=set-caret.js.map