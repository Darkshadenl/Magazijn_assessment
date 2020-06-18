import Wizard_View from "../view/Wizard_View.js";
import Wizard_Model from "../model/Wizard_Model";

export default class Wizard_Controller {

    #wizardModel;
    #wizardView;
    #mainController;

    constructor(mainController) {
        this.#wizardModel = new Wizard_Model();
        this.#wizardView = new Wizard_View(this);
        this.#mainController = mainController;
    }

    get getMainController() {
        return this.#mainController;
    }

    showView(screenName) {
        this.#wizardView.setScreen(screenName);
    }

    hideView() {
        this.#wizardView.hideScreen();
    }

    newItemModel(name) {
        switch (name) {
            case "Kleding":
                return this.#wizardModel.newKledingItem();
            case "Tierlantijn":
                return this.#wizardModel.newTierlantijnItem();
            case "Decoratie":
                return this.#wizardModel.newDecoratieItem();
        }
    }

    get model() {
        return this.#wizardModel;
    }
}
