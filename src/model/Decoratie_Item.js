import Item from "./Item";

export default class Decoratie_Item extends Item{

    constructor() {
        super();
        this.properties.groote_in_cm = undefined;
        this.properties.kleur = undefined;
        this.properties.hoeveelheid_per_pakket = undefined;
    }

    saveToStorage() {
        let retrievedItems = JSON.parse(localStorage.getItem("items"));
        retrievedItems["Decoratie"][this.properties.categorie][this.properties.naam] = this;
        retrievedItems = JSON.stringify(retrievedItems);
        localStorage.setItem("items", retrievedItems);
    }

}