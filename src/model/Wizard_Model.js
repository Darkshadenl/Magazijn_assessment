import Kleding_Item from "./Kleding_Item";
import Tierlantijn_Item from "./Tierlantijn_Item";
import Decoratie_Item from "./Decoratie_Item";

export default class Wizard_Model{

    #kledingitem;
    #tierlantijnitem;
    #decoratieitem;

    #formCount; //Total number of input fields
    #currentForm; //Current input field number

    constructor() {
        this.#formCount = 0;
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
        return this.#formCount;
    }

    get currentForm() {
        return this.#currentForm;
    }

    addForm() {
        this.#formCount += 1;
    }

    nextForm() {
        if(this.#currentForm < this.#formCount) {
            console.log(this.#currentForm);
            console.log(this.#formCount);
            this.#currentForm += 1;
            return true;
        }
        else {
            return false;
        }
    }

    resetFormCount() {
        this.#formCount = 1;
    }

    resetForm() {
        this.#currentForm = 0;
    }
}