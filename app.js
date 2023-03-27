class LinkedListItem extends HTMLElement {
    constructor() {
        super();
        //this.innerHTML = this.getAttribute('data') || undefined;
    }
}

class LinkedList extends HTMLElement {
    constructor() {
        super();
    };
}

let listData = [];

customElements.define("linked-list", LinkedList);
customElements.define("linked-list-item", LinkedListItem);

const append_button = document.getElementById('append');
const insert_button = document.getElementById('insert');
const remove_button = document.getElementById('remove');
const input1 = document.getElementById('input1');
const indexInput = document.getElementById('indexInput');
const input2 = document.getElementById('input2');
const input3 = document.getElementById('input3');
const container = document.getElementById('container');
const list = document.getElementById("linked-list");
const insertErrorLabel = document.getElementById('insertError');

append_button.addEventListener('click', function() {append_element(input2)});
insert_button.addEventListener('click', function() {insert_element(input1, indexInput)});
remove_button.addEventListener('click', function() {remove_element(input3)});

function updateList(inputVal) {
    const children = list.children;

    Array.from(children).forEach((child) => {
        console.log(child.childNodes[0].innerHTML);
        if (inputVal === child.childNodes[0].innerHTML) {
            removeElementWithFade(child);
            const index = listData.indexOf(parseInt(inputVal));
            const deletedItem = listData.splice(index, 1);
        }
    })
}

function removeElementWithFade(element) {
    element.style.transition = "opacity 1s linear";
    element.style.opacity = 0;
    setTimeout(function() {
        element.parentNode.removeChild(element);
    }, 1000);
}


function append_element(input) {
    if (input.value.length <= 0 || !Number.isInteger(parseInt(input.value))){
        insertErrorLabel.innerHTML = "Please input valid values."
        return;
    }
    listData.push(parseInt(input.value));

    const linkedListItem = document.createElement("div");

    var div = document.createElement("linked-list-item");
    var arrow = document.createElement("div");
    arrow.innerHTML = "&rarr;";

    div.style.padding = "1em";
    div.style.color = "red";
    div.style.outline = "1px solid black";
    div.style.fontSize = 12;
    div.style.textAlign = "center";

    div.innerHTML = input.value;

    linkedListItem.appendChild(div);
    linkedListItem.appendChild(arrow);
    linkedListItem.classList.add('list-item-container', 'new-item');

    list.appendChild(linkedListItem);
}

function insert_element(input, inputIndex) {
    insertErrorLabel.innerHTML = "";
    // Handle invalid inputs
    if (input.value.length <= 0 || inputIndex.value.length <= 0 || !Number.isInteger(parseInt(input.value)) || !Number.isInteger(parseInt(inputIndex.value))){
        insertErrorLabel.innerHTML = "Please input valid values."
        return;
    }

    if (inputIndex.value > listData.length && listData.length != 0 || inputIndex.value < 0) {
        insertErrorLabel.innerHTML = "Please input a valid index."
        return;
    }
    listData.splice(parseInt(inputIndex.value), 0, parseInt(input.value));

    const linkedListItem = document.createElement("div");

    var div = document.createElement("linked-list-item");
    var arrow = document.createElement("div");
    arrow.innerHTML = "&rarr;";

    div.style.padding = "1em";
    div.style.color = "red";
    div.style.outline = "1px solid black";
    div.style.fontSize = 12;
    div.style.textAlign = "center";

    div.innerHTML = input.value;

    linkedListItem.appendChild(div);
    linkedListItem.appendChild(arrow);
    linkedListItem.classList.add('list-item-container', 'new-item');

    list.insertBefore(linkedListItem, list.children[parseInt(inputIndex.value)]);
    //list.appendChild(linkedListItem);
    console.log(listData);
}

function remove_element(inputVal) {
    updateList(inputVal.value);

    console.log(listData);
}