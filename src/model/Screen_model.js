export default class Screen_model {

    #items_details;
    #items;
    #selectedItem;
    #name;
    #positions = [];

    constructor(name) {
        this.#name = name;
        this.#retrieveItems();
        this.retrievePositionsFromLocalStorage();
    }

    get getName() {
        return this.#name;
    }

    get getItems() {
        return this.#items;
    }

    get getPositions() {
        return this.#positions;
    }

    getSpecificItems(key) {
        this.#selectedItem = key;
        return this.#items[key];
    }

    isPosTaken(posC, posR) {
        if (!this.#positions) {
            this.#positions = [];
        }

        for (let i = 0; i < this.#positions.length; i++) {
            if (this.#positions[i].row === posR) {
                if (this.#positions[i].col === posC) {
                    console.log("Position found");
                    return true;
                }
            }
        }

        return false;
    }

    updatePositions(position, del, menu) {
        if (del === false || del === undefined) {
            if (position.value !== "" || position.value !== undefined || true) {
                console.log("New item. Make first position log.");
                this.#positions.push(position);
                console.log('Removing from available items.');
                for (let i = 0; i < this.#items[this.#selectedItem].length; i++) {
                    let item = this.#items[this.#selectedItem];
                    if (item !== undefined) {
                        delete item[i];
                        item.splice(i, 1);
                        break;
                    }
                }

                return `Row: ${position.row} Col: ${position.col}`;
            } else {
                for (let i = 0; i < this.#positions.length; i++) {
                    if (this.#positions[i].row === position.old_row && this.#positions[i].col === position.old_col) {
                        this.#positions[i].row = position.row;
                        this.#positions[i].col = position.col;
                        this.#positions[i].old_row = position.old_row;
                        this.#positions[i].old_col = position.old_col;
                        console.log("Position updated.");
                        return `Row: ${this.#positions[i].row}  Col: ${this.#positions[i].col}`;
                    }
                }
            }
        }
        if (del === true) {
            console.log('Deleting...');
            let bc;
            try {
                for (let i = 0; i < this.#positions.length; i++) {
                    if (this.#positions[i].row === position.old_row && this.#positions[i].col === position.old_col) {
                        bc = this.#positions[i].value.toString();
                        this.#positions.splice(i, 1);
                        console.log('Position deleted.');
                        return bc;
                    }
                }
            } catch (e) {
                console.log('Probably nothing went wrong.');
            }
        }
    }

    makeItemAvailable(menu, valueOfItem){
        console.log('Making items available...');

        try{
            let recovered = this.#items_details[menu];
            for (let i = 0; i < recovered.length; i++) {
                if (recovered[i].Naam.toString() === valueOfItem) {
                    this.#items[menu].push(recovered[i]);
                }
            }
        } catch (e) {
            console.log('Something probs went wrong');
        }
    }

    #retrieveItems() {
        let retrieved = JSON.parse(localStorage.getItem('items'));
        let retrieved2 = JSON.parse(localStorage.getItem('items'));

        for (let [key, value] of Object.entries(retrieved)) {
            if (key.toString() === this.getName.toString()) {
                this.#items = value;
            }
        }
        for (let [key, value] of Object.entries(retrieved2)) {
            if (key.toString() === this.getName.toString()) {
                this.#items_details = value;
            }
        }

    }

    isMyMenu(nameOfButton, activeMenu) {
        if (nameOfButton === undefined) {
            console.log('Undefined nameOfButton')
        } else {
            let menu_items = this.#items_details[activeMenu];
            for (let i = 0; i < menu_items.length; i++) {
                if (menu_items[i].Naam.toString() === nameOfButton) {
                    return [true, activeMenu];
                }
            }
            // current menu is not my menu. Find my menu please
            for (let menu in this.#items_details) {
                if (menu !== activeMenu) {
                    let menuOpts = this.#items_details[menu];

                    for (let [key, value] of Object.entries(menuOpts)) {
                        if (value['Naam'] === nameOfButton) {
                            return [false, menu];
                        }
                    }
                }
            }
            console.log('O NOOOO RETURNING FALSE');
            return false;
        }
    }

    retrievePositionsFromLocalStorage() {
        this.#positions = JSON.parse(localStorage.getItem(this.#name));
    }

    savePosToLocalStorage() {
        localStorage.setItem(this.#name, JSON.stringify(this.#positions));
    }
}

