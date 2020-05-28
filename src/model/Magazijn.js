"use strict";

import Screen from "./Screen";

export default class Magazijn {

    #items = [new Screen('Kleding'), new Screen('Tierlantijn'), new Screen('Decoratie')];
    #currentScreen = this.#items[0];

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