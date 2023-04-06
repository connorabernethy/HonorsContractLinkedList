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
const search_button = document.getElementById('search');
const sort_button = document.getElementById('sort');
const input1 = document.getElementById('input1');
const indexInput = document.getElementById('indexInput');
const input2 = document.getElementById('input2');
const input3 = document.getElementById('input3');
const input4 = document.getElementById('input4');
const container = document.getElementById('container');
const list = document.getElementById("linked-list");
const insertErrorLabel = document.getElementById('insertError');

append_button.addEventListener('click', function() {append_element(input2)});
insert_button.addEventListener('click', function() {insert_element(input1, indexInput)});
remove_button.addEventListener('click', function() {remove_element(input3)});
search_button.addEventListener('click', function() {searchForElement(input4)});
sort_button.addEventListener('click', function() {sortElements()});

function updateList(inputVal) {
    const children = list.children;

    Array.from(children).forEach((child) => {
        console.log(child.childNodes[0].innerHTML);
        if (inputVal === child.childNodes[0].innerHTML) {
            removeElementWithFade(child);
            const index = listData.indexOf(parseInt(inputVal));
            const deletedItem = listData.splice(index, 1);
        }
    });
}

function removeElementWithFade(element) {
    element.style.transition = "opacity 1s linear";
    element.style.opacity = 0;
    setTimeout(function() {
        element.parentNode.removeChild(element);
    }, 1000);
}

function swapElements(element1, element2) {
    return new Promise((resolve => {
        var tempE = element1.style.transform;
        element1.style.transform = element2.style.transform;
        element2.style.transform = tempE;

        window.requestAnimationFrame(function() {
            setTimeout(() => {
                list.insertBefore(element2, element1);
                resolve();
            }, 250);
        });
    }));
}

async function sortElements(delay = 100) {
    var linkedList = list.children;

    for (var i = 0; i < linkedList.length; i+= 1){
        for (var j = 0; j < linkedList.length - i - 1; j += 1) {
            linkedList[j].style.color = "red";
            linkedList[j+1].style.color = "red";

            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, delay);
            });

            var item1 = Number(linkedList[j].childNodes[0].innerHTML);
            var item2 = Number(linkedList[j+1].childNodes[0].innerHTML);

            if (item1 > item2) {
                await swapElements(linkedList[j], linkedList[j+1]);
                linkedList = document.querySelectorAll(".list-item-container");
            }

            linkedList[j].style.color = "blue";
            linkedList[j+1].style.color = "blue";
        }

        linkedList[linkedList.length - i - 1].style.color = "black";
    }

    listData.sort((a, b) => a - b);
}

function searchForElement(input) {
    if (check_input(input)) {
        const children = list.children;
        Array.from(children).forEach((child) => {
            if (input.value === child.childNodes[0].innerHTML) {
                child.style.color = "gold";
            }
            setTimeout(function() {
                child.style.color = "black";
            }, 3000);
        });
    } else{return;}
}


function append_element(input) {
    if (check_input(input)){
    listData.push(parseInt(input.value));

    const linkedListItem = document.createElement("div");

    var div = document.createElement("linked-list-item");
    var arrow = document.createElement("div");
    arrow.innerHTML = "&rarr;";

    div.style.padding = "1em";
    div.style.outline = "1px solid black";
    div.style.fontSize = 12;
    div.style.textAlign = "center";

    div.innerHTML = input.value;

    linkedListItem.appendChild(div);
    linkedListItem.appendChild(arrow);
    linkedListItem.classList.add('list-item-container', 'new-item');

    list.appendChild(linkedListItem);
    } else {return;}
}

function insert_element(input, inputIndex) {
    insertErrorLabel.innerHTML = "";
    // Handle invalid inputs
    if (input.value.length <= 0 || inputIndex.value.length <= 0 
        || !Number.isInteger(parseInt(input.value)) 
        || !Number.isInteger(parseInt(inputIndex.value))){
        insertErrorLabel.innerHTML = "Please input valid values."
        return;
    }

    if (inputIndex.value > listData.length || inputIndex.value < 0) {
        insertErrorLabel.innerHTML = "Please input a valid index."
        return;
    }
    listData.splice(parseInt(inputIndex.value), 0, parseInt(input.value));

    const linkedListItem = document.createElement("div");

    var div = document.createElement("linked-list-item");
    var arrow = document.createElement("div");
    arrow.innerHTML = "&rarr;";

    div.style.padding = "1em";
    div.style.outline = "1px solid black";
    div.style.fontSize = 12;
    div.style.textAlign = "center";

    div.innerHTML = input.value;

    linkedListItem.appendChild(div);
    linkedListItem.appendChild(arrow);
    linkedListItem.classList.add('list-item-container', 'new-item');

    list.insertBefore(linkedListItem, list.children[parseInt(inputIndex.value)]);
    console.log(listData);
}

function remove_element(inputVal) {
    check_input(inputVal);
    updateList(inputVal.value);

    console.log(listData);
}

function check_input(input) {
    if (listData.length >= 50) {
        insertErrorLabel.innerHTML = "List length max = 50.";
        return false;
    } else {
        insertErrorLabel.innerHTML = "";
    }

    if (input.value.length <= 0 || !Number.isInteger(parseInt(input.value))){
        insertErrorLabel.innerHTML = "Please input valid values."
        return false;
    } else {
        insertErrorLabel.innerHTML = "";
        return true;
    }
}