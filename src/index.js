"use strict";

import './css/main.scss';
import './css/bootstrap.css';

import Magazijn from "./magazijn";
// import DragDrop from "./DragDrop";

window.onload = () => {
    run();
};

class Index {

    constructor() {
        this.magazijn = new Magazijn();
        this.prepareStorage();
    }

    prepareStorage() {
        fetch('../resources/defaultData.json')
            .then((response) => {
                return response.json();
            }).then((data) => {
            localStorage.setItem("items", JSON.stringify(data));
        });
    }
}

function run() {
    let main = new Index();
}

