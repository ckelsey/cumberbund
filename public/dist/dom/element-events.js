export default function ElementEvents(element) {
    if (!element) {
        return {};
    }
    const events = {};
    const clearEvent = (key) => {
        if (events[key] && typeof events[key] === 'function') {
            events[key]();
        }
        delete events[key];
    };
    return {
        add: (eventName, callback) => {
            clearEvent(eventName);
            element.addEventListener(eventName, callback, true);
            events[eventName] = () => element.removeEventListener(eventName, callback);
        },
        remove: clearEvent,
        dispose: () => Object.keys(events).forEach(clearEvent),
        events
    };
}
//# sourceMappingURL=element-events.js.map