'use strict';

const append_button = document.getElementById('append');
const insert_button = document.getElementById('insert');
const input = document.getElementById('input');
const container = document.getElementById('container');

const state = {
    input: ""
};


append_button.addEventListener('click', append_element);
insert_button.addEventListener('click', function() {insert_element(input)});

const updateItem = (input) => {
    return `<p>${input}</p>`;
};

function renderItem() {
    container.innerHTML += updateItem(state.input);
}

function append_element(form) {
    console.log("BUTTON CLICKED");
}

function insert_element(input) {
    let itemVal = input.value;
    state.input = itemVal;

    renderItem();
}

function remove_element() {

}