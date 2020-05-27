import Screen from "./screen";

export default class Magazijn {

    constructor() {
        this.SetupRegions();
        this._items = [new Screen('Kleding'), new Screen('Tierlantijn'), new Screen('Decoratie')];
        this._current = this._items[0];
    }

    SetupRegions() {
        document.getElementById('kleding_id').onclick = main.magazijn.changeScreen;
        document.getElementById('tier_id').onclick = main.magazijn.changeScreen;
        document.getElementById('decoratie_id').onclick = main.magazijn.changeScreen;
    }

    set Current(newVal){
        this._current = newVal;
        this.changeScreen(this._current);
    }

    get current(){
        return this._current;
    }

    changeScreen(){
        let newProduct = document.getElementById('new_products_button');
        let choice_menu = document.getElementById('dropdownMenuButton');


        newProduct.innerText = `Nieuwe ${this.current.screenName} menu`;
        choice_menu.innerText = this._current.screenName;

        this._current.createDropDownMenu();
    }
}