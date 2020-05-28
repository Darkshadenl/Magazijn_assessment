import Magazijn_View from "../view/Magazijn_View";
import Magazijn from "../model/Magazijn";

export default class Magazijn_Controller {

    #magazijn_view = new Magazijn_View();
    #magazijn_model = new Magazijn();

    constructor() {
        let items_current = this.#magazijn_model.getCurrentScreen.getItems;
        this.#magazijn_view.createDropDownMenu(items_current);
    }

}