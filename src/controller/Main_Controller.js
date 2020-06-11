import Magazijn_Controller from "./Magazijn_Controller.js";
import Weather_Controller from "./Weather_Controller";


export default class Main_Controller {

    #magazijnController;
    #wizardController;
    #weatherController;

    constructor() {
        this.#weatherController = new Weather_Controller();
        this.#magazijnController = new Magazijn_Controller(this.#weatherController, this);
        //this.#wizardController = new Wizard_Controller(this);
    }

    switchToMagazijn(screenName)
    {
        this.#wizardController.hideView();
        this.#magazijnController.showView(screenName);
    }

    switchToWizard(screenName)
    {
        //this.#magazijnController.hideView();
        this.#wizardController.showView(screenName);
    }

}