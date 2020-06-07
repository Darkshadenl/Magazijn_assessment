import Magazijn_Controller from "./Magazijn_Controller.js";
import Wizard_Controller from "./Wizard_Controller.js";
import Weather_Controller from "./Weather_Controller";


export default class Main_Controller {

    #magazijnController;
    #wizardController;
    #weatherController;

    constructor() {
        this.#magazijnController = new Magazijn_Controller(this.#weatherController, this);
        this.#wizardController = new Wizard_Controller(this);
        this.#weatherController = new Weather_Controller();
    }

    switchToMagazijn(screenName) {
        this.#wizardController.hideView();
        this.#magazijnController.showView(screenName);
    }

    switchToWizard(screenName) {
        this.#magazijnController.hideView();
        this.#wizardController.showView(screenName);
    }

    get getCurrentScreen() {

    }

}