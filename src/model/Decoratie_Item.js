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
        if(retrievedItems["Decoratie"]) {
            if(retrievedItems["Decoratie"][this.properties.type]) {
                if(retrievedItems["Decoratie"][this.properties.type].Naam == this.properties.Naam)
                {
                    console.log("Already exists, do nothing");
                    return;
                }
                let newId = retrievedItems["Decoratie"][this.properties.type].length;
                retrievedItems["Decoratie"][this.properties.type][newId] = this.properties;
            }
            else {
                retrievedItems["Decoratie"][this.properties.type] = [this.properties];
            }
            localStorage.setItem("items", JSON.stringify(retrievedItems));
        }
        else {
            console.log("Error: Unable to retrieve items from local storage.");
        }
    }

}