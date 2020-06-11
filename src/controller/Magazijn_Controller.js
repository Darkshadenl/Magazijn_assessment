import Magazijn_View from "../view/Magazijn_View.js";
import Magazijn_Model from "../model/Magazijn_Model.js";

export default class Magazijn_Controller {

    #magazijn_model;
    #magazijn_view;
    #weatherController;

    constructor(weatherController) {
        this.defaultData();
        this.#magazijn_model = new Magazijn_Model();
        this.#magazijn_view = new Magazijn_View(this);
        this.#weatherController = weatherController;

        let gotStorage = this.#magazijn_model.retrieveLocalStorage();

        // if (gotStorage) {
        //     this.#magazijn_model.retrievePosses();
        // } else {
        //     this.#actualDefaultData();
        // }

    }

    get getCurrentScreen() {
        return this.#magazijn_model.getCurrentScreen;
    }

    setCurrentScreen(num) {
        return this.#magazijn_model.setCurrentScreen(num);
    }

    updateModel(position, del, menu) {
        return this.#magazijn_model.getCurrentScreen.updatePositions(position, del);
        ;
    }

    isPosTaken(posC, posR) {
        return this.#magazijn_model.getCurrentScreen.isPosTaken(posC, posR);
    }

    deleteComments(comment, itemName, type) {
        return this.#magazijn_model.getCurrentScreen.deleteComment(comment, itemName, type);
    }

    saveComments(currentMenu, itemName, comment) {
        return this.#magazijn_model.getCurrentScreen.saveComments(currentMenu, itemName, comment);
    }

    updateLocalStorage() {
        return this.#magazijn_model.getCurrentScreen.savePosToLocalStorage();
    }

    retrieveLocalStorage() {
        return this.#magazijn_model.getCurrentScreen.retrievePositionsFromLocalStorage();
    }

    isMyMenu(value, active) {
        return this.#magazijn_model.getCurrentScreen.isMyMenu(value, active);
    }

    setupWeather(city) {
        console.log('Hierzo');
        let weather = this.#weatherController.getWeatherByCity(city);
        return this.#magazijn_model.weatherModel.parseWeatherData(weather);
    }

    defaultData() {
        fetch('../resources/defaultData.json')
            .then((response) => {
                return response.json();
            }).then((data) => {
            localStorage.setItem("items", JSON.stringify(data));
        });
    }

    #actualDefaultData() {
        fetch('../resources/cleanDefaults.json')
            .then((response) => {
                return response.json();
            }).then((data) => {
            localStorage.setItem("items", JSON.stringify(data));
        });
    }

}