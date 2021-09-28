import Get from '../objects/get';
import Try from '../try';
import WalkUp from '../dom/walk-up';
import EventObserver from '../observe/event-observer';
import Observer from '../observe/observer';
const isLink = (el) => Get(el, 'tagName', 'nope').toLowerCase() === 'a' && !!Get(el, 'href') ? el : undefined;
const cycle = (src, checkFn) => {
    let pathIndex = 0;
    let link;
    while (!link && checkFn(pathIndex)) {
        const possibleLink = Get(src, pathIndex.toString(), undefined, isLink);
        if (possibleLink) {
            link = possibleLink;
        }
        pathIndex = pathIndex + 1;
    }
    return link;
};
const getLink = (e) => {
    const target = e.target;
    const tag = Get(target, 'tagName', 'nope').toLowerCase();
    const path = Get(e, 'path', '');
    const ePath = e.composedPath && typeof e.composedPath === 'function' ? e.composedPath() : undefined;
    let link;
    if (tag === 'a') {
        link = target;
    }
    // Chrome and Edge
    if (!link && Array.isArray(path)) {
        link = cycle(Get(e, 'path'), index => index < path.length);
    }
    // Safari
    if (!link && ePath) {
        link = cycle(ePath, index => index < ePath.length);
    }
    // FF and IE
    const ogTarget = Get(e, 'originalTarget', Get(e, 'explicitOriginalTarget'), Get(e, 'parentNode'));
    if (!link && ogTarget) {
        link = WalkUp(ogTarget, el => Get(el, 'tagName').toLowerCase() === 'a');
    }
    // if new tab, go ahead
    if (!link || link.getAttribute('target') === '_blank') {
        return;
    }
    const url = Try(() => new URL(link.href));
    if (!url || url.host !== location.host) {
        return;
    }
    return {
        link,
        href: url.href,
        path: url.pathname,
        search: url.search
    };
};
function LinkClickObserver() {
    const observer = Observer({}, { matchType: true, nextOnNew: true, noSubsComplete: true, noInit: true });
    const clickObserver = EventObserver(document.documentElement, 'click', { preventDefault: getLink });
    const clickSub = clickObserver.subscribe(e => {
        const link = getLink(e);
        if (!link) {
            return;
        }
        observer.next(link);
    }, () => clickSub(), () => clickSub());
    return observer;
}
export default LinkClickObserver();
//# sourceMappingURL=link-click-observer.js.map