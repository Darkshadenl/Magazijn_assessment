import Wizard_View from "../view/Wizard_View.js";

export default class Wizard_testnaam {

    #wizardView;
    #mainController;

    constructor(mainController) {
        this.#wizardView = new Wizard_View(this);
        this.#mainController = mainController;
    }

    get getMainController() {
        return this.#mainController;
    }

    showView(screenName) {
        this.#wizardView().setScreen(screenName);
    }

    hideView() {
        this.#wizardView.hideScreen();
    }
}
