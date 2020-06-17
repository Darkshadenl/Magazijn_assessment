export default class Item {
    //naam, beschrijving, inkoopprijs, verkoopprijs ex btw, verkoop inc btw, minimale voorraad, huidige voorraad.


    properties;

    constructor() {
        this.properties = {
        naam: undefined,
        categorie: undefined,
        beschrijving: undefined,
        inkoopprijs: undefined,
        verkoopprijs: undefined,
        minimaleSupply: undefined,
        huidigeSupply: undefined,
        }
    }

    get getProperties(){
        return this.properties;
    }

    calculateSellingPriceWithTaxes()  {
        let verkoopprijs = this.properties.verkoopprijs;
        return verkoopprijs + (0.21 * verkoopprijs);
    }

    addProperty(propertyName, value) {
        //Do nothing if property already exists
        if(this.properties[propertyName]) { return; }
        this.properties[propertyName] = value;
    }

    saveToStorage() {
        console.log("saving");
    }


}