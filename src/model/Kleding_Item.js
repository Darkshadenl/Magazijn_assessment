import Item from "./Item";

export default class Kleding_Item extends Item{

    constructor() {
        super();
        this.properties.kleur = undefined;
        this.properties.maat = undefined;
    }

    saveToStorage() {
        let retrievedItems = JSON.parse(localStorage.getItem("items"));
        if(retrievedItems["Kleding"]) {
            if(retrievedItems["Kleding"][this.properties.type]) {
                let newId = retrievedItems["Kleding"][this.properties.type].length;
                retrievedItems["Kleding"][this.properties.type][newId] = this.properties;
            }
            else {
                retrievedItems["Kleding"][this.properties.type] = [this.properties];
            }
            localStorage.setItem("items", JSON.stringify(retrievedItems));
        }
        else {
            console.log("Error: Unable to retrieve items from local storage.");
        }
    }
}