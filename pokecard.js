customElements.define('poke-card', class extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById(`poke-card-tmpl`);
        this.attachShadow({mode: 'open'})
            .appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.update(this);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'pokemon' || name === 'src') this.update(this);
    }

    update(elem) {
        const src = elem.getAttribute('src') || 'https://pokeapi.co/api/v2/pokemon/';
        const pokemon = elem.getAttribute('pokemon') || elem.innerHTML;
        if (!pokemon) return;

        const shadow = elem.shadowRoot;
        const reqPokeData = `${src}${pokemon}/`;
        fetch(reqPokeData)
            .then(response => response.json())
            .then(data => {
                shadow.getElementById('name').innerHTML = data.name;
                shadow.getElementById('front-image')
                    .setAttribute('src', data.sprites.front_default);
            })
            .catch(err => console.log(`Error: ${err}`));
    }

    static get observedAttributes() { return ['pokemon', 'src']; }
});
