import IsNothing from '../checks/is-nothing';
function queryObjectToString(query = {}) {
    if (!Object.keys(query).length) {
        return '';
    }
    const queries = Object
        .keys(query)
        .map(function (q) { return IsNothing(query[q]) ? false : ''.concat(q, '=', query[q]); })
        .filter(function (v) { return !!v; })
        .join('&');
    if (queries) {
        return `?${queries}`;
    }
    return '';
}
export default queryObjectToString;
//# sourceMappingURL=query-object-to-string.js.map