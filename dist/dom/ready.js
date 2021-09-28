export default function DOMReady() {
    return new Promise((resolve) => {
        return document.readyState !== 'loading' ?
            resolve(document) :
            document.addEventListener('DOMContentLoaded', resolve);
    });
}
//# sourceMappingURL=ready.js.map