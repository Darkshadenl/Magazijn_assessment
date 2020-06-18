import Item from "./Item";

export default class Kleding_Item extends Item{

    constructor() {
        super();
        this.properties.kleur = undefined;
        this.properties.maat = undefined;
    }

    saveToStorage() {
        let retrievedItems = JSON.parse(localStorage.getItem("items"));
        if(retrievedItems["Kledign"]) {
            let newId;
            if(retrievedItems["Kleding"][this.properties.type]) {
                newId = retrievedItems["Kleding"][this.properties.type].length;
            }
            else {
                newId = 0;
            }
            retrievedItems["Kleding"][this.properties.type][newId] = this.properties;
        }
        else
        {
            console.log("Error: Unable to retrieve items from local storage.");
        }
    }
    
}