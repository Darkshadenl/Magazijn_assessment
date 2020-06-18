import Kleding_Item from "./Kleding_Item";
import Tierlantijn_Item from "./Tierlantijn_Item";
import Decoratie_Item from "./Decoratie_Item";

export default class Wizard_Model{

    #kledingitem;
    #tierlantijnitem;
    #decoratieitem;


    #formProgress; //Current input field number

    constructor() {
        this.#formProgress = 1;
    }

    newKledingItem(){
        this.#kledingitem = new Kleding_Item();
        return this.#kledingitem;
    }

    newTierlantijnItem(){
        this.#tierlantijnitem = new Tierlantijn_Item();
        return this.#tierlantijnitem;
    }

    newDecoratieItem(){
        this.#decoratieitem = new Decoratie_Item();
        return this.#decoratieitem;
    }

    get kledingItem() {
        return this.#kledingitem;
    }

    get tierlantijnItem() {
        return this.#tierlantijnitem;
    }

    get decoratieItem() {
        return this.#decoratieitem;
    }

    get formProgress() {
        return this.#formProgress;
    }

    nextForm() {
        this.#formProgress++;
    }

    resetFormProgress() {
        this.#formProgress = 1;
    }
}