import Kleding_Item from "./Kleding_Item";
import Tierlantijn_Item from "./Tierlantijn_Item";
import Decoratie_Item from "./Decoratie_Item";

export default class Wizard_Model{

    #kledingitem;
    #tierlantijnitem;
    #decoratieitem;

    #formTotal; //Total number of input fields
    #currentForm; //Current input field number

    constructor() {
        this.#formTotal = 0;
        this.#currentForm = 1;
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

    get formCount() {
        return this.#formTotal;
    }

    get currentForm() {
        return this.#currentForm;
    }

    addForm() {
        this.#formTotal += 1;
    }

    nextForm() {
        if(this.#currentForm < this.#formTotal) {
            console.log(this.#currentForm);
            console.log(this.#formTotal);
            this.#currentForm += 1;
            return true;
        }
        else {
            return false;
        }
    }

    resetFormCount() {
        this.#formTotal = 0;
    }

    resetForm() {
        this.#currentForm = 1;
    }
}