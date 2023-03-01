class LinkedListItem extends HTMLDivElement {
    constructor() {
        super();
        this.innerHTML = "BANG";
        //this.innerHTML = this.getAttribute('data') || undefined;
    }
}

class LinkedList extends HTMLLIElement {
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
const input3 = document.getElementById('input3')
const container = document.getElementById('container');
const list = document.getElementById("linked-list");

append_button.addEventListener('click', append_element);
insert_button.addEventListener('click', function() {insert_element(input1)});
remove_button.addEventListener('click', function() {remove_element(input3)});

function updateList() {
    const children = list.children;
    listData.forEach((item) => {
        Array.from(children).forEach((child) => {
            if (item === child.innerHTML) {
                child.remove();
            }
        })
    })
}


function append_element(form) {
    console.log("BUTTON CLICKED");
}

function insert_element(input) {
    listData.push(input.value);

    const linkedListItem = document.createElement("div");
    linkedListItem.className = "list-item-container";

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

    list.appendChild(linkedListItem);
    console.log(listData);
}

function remove_element(inputVal) {
    updateList();
    listData.forEach((item) => {
        if (inputVal.value === item) {
            const index = listData.indexOf(item);

            const deletedItem = listData.splice(index, 1);
            console.log(deletedItem);
        }
    })

    console.log(listData);
}