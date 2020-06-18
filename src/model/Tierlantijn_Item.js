import Item from "./Item";

export default class Tierlantijn_Item extends Item {

    constructor() {
        super();
        this.properties.gewicht = undefined;
    }

    saveToStorage() {
        let retrievedItems = JSON.parse(localStorage.getItem("items"));
        if(retrievedItems["Tierlantijn"]) {
            if(retrievedItems["Tierlantijn"][this.properties.type]) {
                let newId = retrievedItems["Tierlantijn"][this.properties.type].length;
                retrievedItems["Tierlantijn"][this.properties.type][newId] = this.properties;
            }
            else {
                retrievedItems["Tierlantijn"][this.properties.type] = [{0: this.properties}];
            }
            console.log(retrievedItems["Tierlantijn"]);
            localStorage.setItem("items", JSON.stringify(retrievedItems));
        }
        else {
            console.log("Error: Unable to retrieve items from local storage.");
        }
    }
}