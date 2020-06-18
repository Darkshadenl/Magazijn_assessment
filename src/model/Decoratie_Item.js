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
        if(retrievedItems["Decoratie"])
        {
            let newId;
            if(retrievedItems["Decoratie"][this.properties.type]) {
                newId = retrievedItems["Decoratie"][this.properties.type].length;
            }
            else {
                newId = 0;
            }
            retrievedItems["Decoratie"][this.properties.type][newId] = this.properties;
        }
        else
        {
            console.log("Error: Unable to retrieve items from local storage.");
        }
    }

}