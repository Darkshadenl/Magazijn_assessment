"use strict";

import './css/main.scss';
import './css/bootstrap.css';

// import DragDrop from "./DragDrop";
import Magazijn from "./model/magazijn";

window.onload = () => {
    document.getElementById('kleding_id').onclick = changeScreen;
    document.getElementById('tier_id').onclick = changeScreen;
    document.getElementById('decoratie_id').onclick = changeScreen;
};

export default class Index {

    #magazijn = new Magazijn();

    constructor() {
        this.prepareStorage();
        // this.getMagazijn = this.getMagazijn.bind(this);   BINDING
    }

    get getMagazijn(){
        return this.#magazijn;
    }

    prepareStorage() {
        fetch('./src/resources/defaultData.json')
            .then((response) => {
                return response.json();
            }).then((data) => {
            localStorage.setItem("items", JSON.stringify(data));
        });
    }

}

const index = new Index();

function changeScreen(e){
    let clicked = e.target.innerText;
    let newProduct = document.getElementById('new_products_button');
    let choice_menu = document.getElementById('dropdownMenuButton');

    let mag = index.getMagazijn;

    switch (e.target.innerText) {
        case "Regio 1: Kleding":
            mag.setCurrentScreen = 0;
            break;
        case "Regio 2: Tierlantijn":
            mag.setCurrentScreen= 1;
            break;
        case "Regio 3: Decoratie":
            mag.setCurrentScreen= 2;
            break;
    }

    let cur_screen = index.getMagazijn.getCurrentScreen;

    newProduct.innerText = `Nieuwe ${cur_screen.getName} menu`;
    choice_menu.innerText = cur_screen.getName;

    console.log(cur_screen);

    cur_screen.createDropDownMenu();
}

