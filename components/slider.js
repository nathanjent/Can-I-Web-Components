import { define } from "https://unpkg.com/osagai/osagai.mjs";
import { on } from "https://unpkg.com/osagai/events.mjs";
import { update } from "https://unpkg.com/osagai/dom.mjs";

function Slider({element, query}) {
    const initialState = {
        count: element.getAttribute('position'),
    };
    on('click', query('.btn'), () => {
        update(element, ({ count } = initialState) => {
            count += 1;
            return { count };
        });
    });

    return ({ count } = initialState) => `
        <button class="btn">
        Count: ${count}
        </button>`;
};

define('simple-counter', SimpleCounter);
