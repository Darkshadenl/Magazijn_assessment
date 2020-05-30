import Screen_model from "./Screen_model";

export default class Magazijn_Model {

    #items = [new Screen_model('Kleding'), new Screen_model('Tierlantijn'), new Screen_model('Decoratie')];
    #currentScreen = this.#items[0];

    constructor() {

    }

    set setCurrentScreen(int) {
        this.#currentScreen = this.#items[int];
    }

    get getCurrentScreen() {
        return this.#currentScreen;
    }

    get getItems() {
        return this.#items;
    }

}