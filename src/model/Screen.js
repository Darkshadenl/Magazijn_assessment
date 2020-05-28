"use strict";

export default class Screen {

    #items = [];
    #name;

    constructor(name) {
        this.#name = name;
        this.#retrieveItems();
    }

    get getName(){
        return this.#name;
    }

    get getItems(){
        return this.#items;
    }

    #retrieveItems(){
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

}

