

export default class Wizard_Controller {

    #magazijnController;
    // #crudController;

    constructor() {
        this.#magazijnController = new Magazijn_Controller();
        // this.#crudController = new Crud_Controller();
    }

}