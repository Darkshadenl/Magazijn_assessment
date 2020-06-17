import Item from "./Item";

export default class Kleding_Item extends Item{

    constructor() {
        super();
        this.properties.kleur = undefined;
        this.properties.maat = undefined;
    }

    saveToStorage() {
        let retrievedItems = JSON.parse(localStorage.getItem("items"));
        if(retrievedItems["Kleding"]) //in principe niet nodig
        {
            if(retrievedItems["Kleding"][this.properties.type]) {
                let newId = retrievedItems["Kleding"][this.properties.type].length;
                //0: {Naam: "Coole broek", type: "Broeken",
                //{Naam: "Coole broek", type: "Broeken", beschrijving: "Een coole broek van een mooie stof", inkoopprijs: 10, minimale voorraad: 5, …}
                console.log(this.properties);
                retrievedItems["Kleding"][this.properties.type][newId] = this.properties;
                console.log(retrievedItems["Kleding"][this.properties.type][newId]);
            }
            else {
                console.log(this.properties.type);
            }
        }
        else
        {
            console.log("heel raar dit");
        }



        retrievedItems = JSON.stringify(retrievedItems);
        localStorage.setItem("items", retrievedItems);
        let itemtest = JSON.parse(localStorage.getItem("items"));

        console.log(itemtest["Kleding"]);
    }
}