import parseUrl from './parse-url';
export default function GetRouteByPath(routes) {
    return function getRouteByPathInner(path = '') {
        path = parseUrl(path.toLowerCase()).split('/').filter(v => !!v).join('/');
        let r;
        let i = 0;
        const routePaths = Object.keys(routes || {});
        const urlParts = typeof path === 'string' ? path.split('/').filter(v => !!v) : [];
        while (i < routePaths.length && !r) {
            if (routes[routePaths[i]].path === path) {
                return routes[routePaths[i]];
            }
            if (routes[routePaths[i]].path.indexOf('/*') > -1) {
                const pathParts = routes[routePaths[i]].path.split('/');
                if (pathParts.length > urlParts.length) {
                    if (pathParts[urlParts.length - 1] !== '**') {
                        i = i + 1;
                        continue;
                    }
                }
                if (pathParts.length < urlParts.length) {
                    if (pathParts[pathParts.length - 1] !== '**') {
                        i = i + 1;
                        continue;
                    }
                }
                let match = false;
                let partsIndex = 0;
                while (partsIndex < pathParts.length) {
                    if (urlParts[partsIndex] !== pathParts[partsIndex] && pathParts[partsIndex].indexOf('*') === -1) {
                        match = false;
                        break;
                    }
                    match = true;
                    partsIndex = partsIndex + 1;
                }
                if (match) {
                    return routes[routePaths[i]];
                }
            }
            i = i + 1;
        }
    };
}
//# sourceMappingURL=get-route-by-path.js.map