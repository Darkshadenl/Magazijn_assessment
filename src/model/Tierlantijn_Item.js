import Item from "./Item";

export default class Tierlantijn_Item extends Item {

    constructor() {
        super();
        this.properties.gewicht = undefined;
    }

    saveToStorage() {
        let retrievedItems = JSON.parse(localStorage.getItem("items"));
        retrievedItems["Tierlantijn"][this.properties.categorie][this.properties.naam] = this;
        retrievedItems = JSON.stringify(retrievedItems);
        localStorage.setItem("items", retrievedItems);
    }
}