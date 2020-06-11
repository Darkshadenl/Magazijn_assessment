export default class Item {
    //naam, beschrijving, inkoopprijs, verkoopprijs ex btw, verkoop inc btw, minimale voorraad, huidige voorraad.

    category;
    properties;

    constructor() {
        this.properties = {
        naam: undefined,
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

    addProperty(property, value) {

    }

}