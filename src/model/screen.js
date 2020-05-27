"use strict";

export default class Screen {

    #items = [];
    #name;

    constructor(name) {
        this.#name = name;
        this.retrieveItems();
        this.createDropDownMenu();
    }

    get getName(){
        return this.#name;
    }

    get getItems(){
        return this.#items;
    }

    createDropDownMenu() {
        let choice_menu = document.querySelector('.choice_menu');

        if (choice_menu.hasChildNodes()) {
            choice_menu.innerHTML = '';
        }

        if (this.#items != null) {
            this.#items.forEach(
                element => {
                    let button = this.getDraggableButton();
                    button.className = 'btn btn-secondary dragButton';
                    let buttonText = document.createTextNode(element);
                    button.appendChild(buttonText);
                    choice_menu.appendChild(button);
                }
            );
        }
    }

    retrieveItems(){
        let retrieved = JSON.parse(localStorage.getItem('items'));
        let myItems;

        for (let [key, value] of Object.entries(retrieved)) {
            if (key.toString() === this.getName.toString()) {
                myItems = value;
            }
        }

        for (let [key] of Object.entries(myItems)) {
            this.#items.push(key);
        }
    }

    getDraggableButton(){
        let button = document.createElement('button');
        button.setAttribute('draggable', 'True');
        // button.addEventListener('dragstart', dragStart);
        // button.addEventListener('dragend', dragEnd);
        button.id = 'dragButton';
        return button;
    }

}

