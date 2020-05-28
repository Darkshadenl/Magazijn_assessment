"use strict";

import './css/main.scss';
import './css/bootstrap.css';

import Main_Controller from "./controller/Main_Controller";

export default class Index {

    #mainController = new Main_Controller();

}

const app = new Index();

