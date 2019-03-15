import { SimpleCounter } from './components/simpleCounter.js';
import { defineSimpleComponent } from '../simplecomponent.js';

// Define a custom element, the '-' is required in the name
defineSimpleComponent('person-card');
defineSimpleComponent('confirm-deny');

function addEmployeeCard() {
    const nameField = document.querySelector('input[name="namefield"]');
    if (!nameField || !nameField.value) return;
    const occupationField = document.querySelector('input[name="occupationfield"]');
    if (!occupationField || !occupationField.value) return;
    const employeeSection = document.getElementById('employeecards');

    const newCard = document.createElement('person-card');

    const nameSpan = document.createElement('span');
    nameSpan.setAttribute('slot', 'person-name');
    nameSpan.innerHTML = nameField.value;
    newCard.appendChild(nameSpan);

    const descSpan = document.createElement('span');
    descSpan.setAttribute('slot', 'person-desc');
    descSpan.innerHTML = occupationField.value;
    newCard.appendChild(descSpan);

    employeeSection.appendChild(newCard);

    // Clear fields on success
    nameField.value = '';
    occupationField.value = '';

    nameField.focus();
}

(() => {
    document.querySelector('input[name="AddEmployee"')
        .addEventListener('click', addEmployeeCard);

    // Initial focus on the name field
    document.querySelector('input[name="namefield"]').focus();
})();
