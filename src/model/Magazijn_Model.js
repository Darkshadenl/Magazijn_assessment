import Screen_model from "./Screen_model";

export default class Magazijn_Model {

    #items = [new Screen_model('Kleding'), new Screen_model('Tierlantijn'), new Screen_model('Decoratie')];
    #currentScreen = this.#items[0];

    constructor() {

    }

    setCurrentScreen(int) {
        this.#currentScreen = this.#items[int];
        return this.#currentScreen.getPositions;
    }

    get getCurrentScreen() {
        return this.#currentScreen;
    }

    get getItems() {
        return this.#items;
    }

}