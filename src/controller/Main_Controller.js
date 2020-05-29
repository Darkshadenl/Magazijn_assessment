import Magazijn_Controller from "./Magazijn_Controller.js";

export default class Main_Controller {

    #magazijnController;
    // #crudController;

    constructor() {
        this.#magazijnController = new Magazijn_Controller();
        // this.#crudController = new Crud_Controller();
    }

}