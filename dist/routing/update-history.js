import queryObjectToString from './query-object-to-string';
function formatPath(path = '') {
    return path[0] == '/' ? path : `/${path}`;
}
function fullUrl(path, query = {}) {
    return `${location.protocol}//${location.host}${formatPath(path)}${queryObjectToString(query)}`;
}
export default function UpdateHistory(path = '/', query = {}, replace = false) {
    const full = fullUrl(path, query);
    if (replace && history.replaceState) {
        history.replaceState({}, document.title, full);
    }
    if (!replace && history.pushState) {
        history.pushState({}, document.title, full);
    }
}
//# sourceMappingURL=update-history.js.map