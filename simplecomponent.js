/**
 * Creates a simple web component from a template with the id "{tag-name}-tmpl".
 * @param {string} tag - Name of the element to create
 * @param {() => ()} connectedCb - connectedCallback
 * @param {() => ()} disconnectedCb - disconnectedCallback
 * @param {() => ()} adoptedCb - adoptedCallback
 * @param {(string, any, any) => ()} attributeChangedCb - attributeChangedCallback
 * @param {[string]} observedAttr - observedAttributes
 */
export function defineSimpleComponent(
    tag,
    connectedCb = () => {},
    disconnectedCb = () => {},
    adoptedCb = () => {},
    attributeChangedCb = () => {},
    observedAttr = [],
) {
    customElements.define(tag, class extends HTMLElement {
        constructor() {
            super();
            const template = document.getElementById(`${tag}-tmpl`);
            const shadow = this.attachShadow({mode: 'open'})
                .appendChild(template.content.cloneNode(true));
        }

        connectedCallback() {
            connectedCb(this);
        };

        disconnectedCallback() {
            disconnectedCb(this);
        };

        adoptedCallback() {
            adoptedCb(this);
        };

        attributeChangedCallback() {
            attributeChangedCb(this);
        };

        static get observedAttributes() { return observedAttr; }
    });
}
