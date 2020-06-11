import Item from "./Item";

export default class Decoratie_Item extends Item{

    constructor() {
        super();
        this.properties.groote_in_cm = undefined;
        this.properties.kleur = undefined;
        this.properties.hoeveelheid_per_pakket = undefined;
    }
}