import Magazijn_View from "../view/Magazijn_View";
import Magazijn from "../model/Magazijn";

export default class Magazijn_Controller {

    #magazijn_model = new Magazijn();
    #magazijn_view = new Magazijn_View(this);

    constructor() {

    }

    get getCurrentScreen() {
        return this.#magazijn_model.getCurrentScreen;
    }

    setCurrentScreen(int) {
        this.#magazijn_model.setCurrentScreen = int;
    }

}