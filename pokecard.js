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
        if (name === 'src') this.update(this, newValue);
    }

    update(elem, src) {
        src = src || elem.getAttribute('src') || 'https://pokeapi.co/api/v2/pokemon/';
        if (!src) return;
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

    static get observedAttributes() { return ['src']; }
});

customElements.define('paginate-cards', class extends HTMLElement {    
    connectedCallback() {
        const elem = this;

        this.update(this, (data, src) => {
            const prevBtn = document.createElement('input');
            prevBtn.setAttribute('id', 'prev-btn');
            prevBtn.setAttribute('type', 'button');
            if (data.previous) {
                prevBtn.setAttribute('src', data.previous);
            } else {
                prevBtn.setAttribute('src', null);
            }
            prevBtn.className = 'nes-btn is-primary';
            prevBtn.setAttribute('value', '<<');
            prevBtn.addEventListener('click', ev => {
                const prevSet = prevBtn.getAttribute('src');
                if (prevSet) {
                    elem.setAttribute('src', prevSet);
                }
            });
            elem.appendChild(prevBtn);

            for (let name of data.results.map(result => result.name))
            {
                const pokeCard = document.createElement('poke-card');
                pokeCard.setAttribute('src', src.replace(/\?.*$/, ''));
                pokeCard.innerHTML = name;
                elem.appendChild(pokeCard);
            }

            const nextBtn = document.createElement('input');
            nextBtn.setAttribute('id', 'next-btn');
            nextBtn.setAttribute('type', 'button');
            if (data.next) {
                nextBtn.setAttribute('src', data.next);
            } else {
                nextBtn.setAttribute('src', null);
            }
            nextBtn.className = 'nes-btn is-primary';
            nextBtn.setAttribute('value', '>>');
            nextBtn.addEventListener('click', ev => {
                const nextSet = nextBtn.getAttribute('src');
                if (nextSet) {
                    elem.setAttribute('src', nextSet);
                }
            });
            elem.appendChild(nextBtn);
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.update(this, data => {
            let pokeCards = document.querySelectorAll('poke-card');
            let i = 0;
            for (let name of data.results.map(result => result.name))
            {
                let card = pokeCards[i++];
                if (card) card.setAttribute('pokemon', name);
            }
        });
    }

    update(elem, updateCards) {
        const src = elem.getAttribute('src');
        if (!src) return;
        if (src === 'null') return;
        fetch(src)
            .then(response => {
                return response.json();
            })
            .then(data => updateCards(data, src))
            .catch(err => console.log(`Error: ${err}`));
    }

    static get observedAttributes() { return ['src', 'limit', 'offset']; }
}, { extends: 'section' });
