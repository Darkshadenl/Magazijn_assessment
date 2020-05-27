"use strict";

import Magazijn from "./magazijn";
// import DragDrop from "./DragDrop";

window.onload = () => {
    run();
};

class Index {

    constructor() {
        this.prepareStorage();
        this.magazijn = new Magazijn();
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
