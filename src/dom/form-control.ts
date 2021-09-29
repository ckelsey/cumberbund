const onSubmit = function (input: HTMLInputElement) {
    return function () {
        if (!input) { return }
        if (input.validationMessage) { (this || {} as any).error = input.validationMessage }
    }
}
export default function FormControl(inputid: string, input: HTMLInputElement, form: HTMLFormElement) {
    if (!form) { return }

    const onSub = onSubmit(input).bind(this)

    if (!form.events) { form.events = {} }

    if (form.events[inputid] && typeof form.events[inputid] === 'function') {
        form.events[inputid]()
    }

    form.addEventListener('submit', onSub)
    form.events[inputid] = () => {
        form.removeEventListener('submit', onSub)
        delete form.events[inputid]
    }
}