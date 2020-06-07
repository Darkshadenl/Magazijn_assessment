import Magazijn_View from "../view/Magazijn_View.js";
import Magazijn_Model from "../model/Magazijn_Model.js";

export default class Magazijn_Controller{

    #magazijn_model;
    #magazijn_view;
    #weatherController;
    #main_controller;

    constructor(weatherController, mainController) {
        this.defaultData();
        this.#magazijn_model = new Magazijn_Model();
        this.#magazijn_view = new Magazijn_View(this);
        this.#weatherController = weatherController;
        this.#main_controller = mainController;
    }

    get getMainController() {
        return this.#main_controller;
    }

    get getCurrentScreen() {
        return this.#magazijn_model.getCurrentScreen;
    }

    setCurrentScreen(num) {
        return this.#magazijn_model.setCurrentScreen(num);
    }

    updateModel(position, del, menu){
        return this.#magazijn_model.getCurrentScreen.updatePositions(position, del);;
    }

    isPosTaken(posC, posR){
        return this.#magazijn_model.getCurrentScreen.isPosTaken(posC, posR);
    }

    updateLocalStorage(){
        return this.#magazijn_model.getCurrentScreen.savePosToLocalStorage();
    }

    retrieveLocalStorage(){
        return this.#magazijn_model.getCurrentScreen.retrievePositionsFromLocalStorage();
    }

    isMyMenu(value, active){
        return this.#magazijn_model.getCurrentScreen.isMyMenu(value, active);
    }

    setupWeather(city){
        console.log('Hierzo');
        let weather = this.#weatherController.getWeatherByCity(city);
        alert(weather);
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

    showView(screenName) {
        this.#magazijn_view.showScreen(screenName);
    }

    // hideView() {
    //     this.#magazijn_view.hideScreen();
    // }
}