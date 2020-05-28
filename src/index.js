"use strict";

import './css/main.scss';
import './css/bootstrap.css';

import Main_Controller from "./controller/Main_Controller";

export default class Index {

    #mainController = new Main_Controller();

    constructor() {
        this.defaultData();
    }

    defaultData() {
        fetch('./src/resources/defaultData.json')
            .then((response) => {
                return response.json();
            }).then((data) => {
            localStorage.setItem("items", JSON.stringify(data));
        });
    }
}

const app = new Index();

