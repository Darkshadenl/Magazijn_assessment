import Magazijn_View from "../view/Magazijn_View.js";
import Magazijn_Model from "../model/Magazijn_Model.js";

export default class Magazijn_Controller{

    #magazijn_model;
    #magazijn_view;

    constructor() {
        this.defaultData();
        this.#magazijn_model = new Magazijn_Model();
        this.#magazijn_view = new Magazijn_View(this);
    }

    get getCurrentScreen() {
        return this.#magazijn_model.getCurrentScreen;
    }

    setCurrentScreen(num) {
        this.#magazijn_model.setCurrentScreen = num;
    }

    updateModel(position){
        this.#magazijn_model.updatePosition = position;
    }

    defaultData() {
        fetch('../resources/defaultData.json')
            .then((response) => {
                return response.json();
            }).then((data) => {
            localStorage.setItem("items", JSON.stringify(data));
        });
    }

}