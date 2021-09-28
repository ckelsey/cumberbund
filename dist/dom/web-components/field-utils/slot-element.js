import RemoveElement from '../../remove-element';
import Create from '../../create';
import EventObserver from '../../../observe/event-observer';
function slottedElement(slotted, createOptions) {
    return slotted ? slotted : Create(createOptions);
}
function findSLottedAndRemoveOthers(el, name, slotted) {
    const slotteds = Array.from(el.querySelectorAll(`[slot="${name}"]`));
    if (!slotted) {
        slotted = slotteds.pop();
    }
    while (slotteds.length) {
        const currentSlotted = slotteds.pop();
        if (currentSlotted && currentSlotted !== slotted) {
            RemoveElement(currentSlotted);
        }
    }
    return slotted;
}
export function getSlottedElement(el, name, createOptions, slotted) {
    return slottedElement(findSLottedAndRemoveOthers(el, name, slotted), createOptions);
}
export function getSlot(el, name) {
    if (!el || !el.shadowRoot) {
        return;
    }
    return el.shadowRoot.querySelector(`slot[name="${name}"]`);
}
export function slotEvent(el, slot, createOptions) {
    if (!slot) {
        return;
    }
    const name = slot.getAttribute('name');
    const eventName = `${name}SlotChange`;
    if (slot && !el.events[eventName]) {
        el.events[eventName] = EventObserver(slot, 'slotchange', { noSubsComplete: false });
        el.events[eventName].subscribe(() => el.state[name].next(getSlottedElement(el, name, createOptions)));
    }
}
//# sourceMappingURL=slot-element.js.map