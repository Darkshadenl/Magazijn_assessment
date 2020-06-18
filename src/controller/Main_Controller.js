import Magazijn_Controller from "./Magazijn_Controller.js";
import Weather_Controller from "./Weather_Controller";
import Wizard_Controller from "./Wizard_Controller";

export default class Main_Controller {

    #magazijnController;
    #wizardController;
    #weatherController;

    constructor() {
        this.#weatherController = new Weather_Controller();
        this.#magazijnController = new Magazijn_Controller(this.#weatherController, this);
        this.#wizardController = new Wizard_Controller(this);
        this.switchToMagazijn();

    }

    switchToMagazijn() {
        this.#wizardController.hideView();
        this.#magazijnController.showView();
        //test();
    }

    switchToWizard(screenName) {
        this.#magazijnController.hideView();
        this.#wizardController.showView(screenName);
    }

    //shows the items in localstorage
    test() {
        let retrievedItems = JSON.parse(localStorage.getItem("items"));
        console.log(retrievedItems);
    }
}