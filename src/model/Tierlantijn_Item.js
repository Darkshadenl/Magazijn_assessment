import Item from "./Item";

export default class Tierlantijn_Item extends Item {

    constructor() {
        super();
        this.properties.gewicht = undefined;
    }

    saveToStorage() {
        let retrievedItems = JSON.parse(localStorage.getItem("items"));
        if(retrievedItems["Tierlantijn"]) {
            let newId;
            if(retrievedItems["Tierlantijn"][this.properties.type]) {
                newId = retrievedItems["Tierlantijn"][this.properties.type].length;
            }
            else {
                newId = 0;
            }
            retrievedItems["Tierlantijn"][this.properties.type][newId] = this.properties;
        }
        else
        {
            console.log("Error: Unable to retrieve items from local storage.");
        }
    }
}