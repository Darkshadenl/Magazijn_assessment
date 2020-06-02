import Screen_model from "./Screen_model";
import Weather_Model from "./Weather_Model";

export default class Magazijn_Model {

    #items = [new Screen_model('Kleding'), new Screen_model('Tierlantijn'), new Screen_model('Decoratie')];
    #currentScreen = this.#items[0];
    #weather_model = new Weather_Model();

    constructor() {
        this.#items.forEach(e => {
            e.retrievePositionsFromLocalStorage();
        });
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

    get weatherModel() {
        return this.#weather_model;
    }

}