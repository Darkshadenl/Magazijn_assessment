import Item from "./Item";

export default class Kleding_Item extends Item{

    constructor() {
        super();
        this.categorie = '';
        this.properties.kleur = undefined;
        this.properties.maat = undefined;
    }
}