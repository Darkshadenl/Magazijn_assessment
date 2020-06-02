import Magazijn_Controller from "./Magazijn_Controller.js";
import Weather_Controller from "./Weather_Controller";

export default class Main_Controller {

    #magazijnController;
    #weatherController;
    // #crudController;

    constructor() {
        this.#weatherController = new Weather_Controller();
        this.#magazijnController = new Magazijn_Controller(this.#weatherController);

        // this.#crudController = new Crud_Controller();
    }

}