import Item from "./Item";

export default class Kleding_Item extends Item{

    constructor() {
        super();
        this.properties.kleur = undefined;
        this.properties.maat = undefined;
    }

    saveToStorage() {
        let retrievedItems = JSON.parse(localStorage.getItem("items"));
        console.log(this.properties);
        console.log(this.properties.categorie);
        console.log(this.properties.naam);
        retrievedItems["Kleding"][this.properties.categorie][this.properties.naam] = this;

        retrievedItems = JSON.stringify(retrievedItems);
        localStorage.setItem("items", retrievedItems);
    }
}