import CreateComponent from "../component.js"

const TestComponent = CreateComponent({
    selector: 'test-component',
    template: '<div>Yep, here is some text: <div class="text-content"></div></div>',
    style: 'div{color:red;}',
    connectedCallback: function () {
        console.log('connectedCallback', this)
    },
    state: {
        text: {
            initialValue: 'Hello!',
            matchType: true,
            isAttribute: true,
            onChange: function (value) {
                const host = this as any

                if (host.shadowRoot) {
                    console.log(value)
                    host.shadowRoot.querySelector('.text-content').textContent = value
                } else {
                    console.log('no shadow', this)
                }
            }
        }
    }
})

export default TestComponent