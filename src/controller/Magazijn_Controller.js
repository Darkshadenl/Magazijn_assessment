import Magazijn_View from "../view/Magazijn_View";
import Magazijn from "../model/Magazijn";

export default class Magazijn_Controller {

    #magazijn_model;
    #magazijn_view;

    constructor() {
        this.defaultData();
        this.#magazijn_model = new Magazijn();
        this.#magazijn_view = new Magazijn_View(this);
    }

    get getCurrentScreen() {
        return this.#magazijn_model.getCurrentScreen;
    }

    setCurrentScreen(int) {
        this.#magazijn_model.setCurrentScreen = int;
    }

    defaultData() {
        fetch('./src/resources/defaultData.json')
            .then((response) => {
                return response.json();
            }).then((data) => {
            localStorage.setItem("items", JSON.stringify(data));
        });
    }

}