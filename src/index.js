"use strict";

import './css/main.scss';
import './css/bootstrap.css';
import './resources/defaultData';

import Main_Controller from "./controller/Main_Controller";

class Index {

    #mainController;

    constructor() {
        this.#mainController = new Main_Controller();
    }

}

const app = new Index();

