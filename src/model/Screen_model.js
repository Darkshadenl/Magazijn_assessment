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
        console.log('Get position ran!');
        return this.#positions;
    }

    getDataOfPosition(value, row, col) {
        let data = [];

        if (value !== undefined) {
            for (let categorie in this.#items_details) {
                this.#items_details[categorie].forEach(item => {
                    if (item['Naam'] === value) {
                        data = item;
                    }
                })
            }
        } else {

        }

        return data;
    }

    getSpecificItems(key) {
        this.#selectedItem = key;
        return this.#items[key];
    }

    isPosTaken(posC, posR) {
        if (!this.getPositions) {
            this.#positions = [];
        }
        let local_positions = this.getPositions;

        for (let i = 0; i < local_positions.length; i++) {
            if (local_positions[i].row === posR) {
                if (local_positions[i].col === posC) {
                    console.log("Position found");
                    return true;
                }
            }
        }
        return false;
    }

    updatePositions(position, del) {
        let local_positions = this.getPositions;
        if (del === false || del === undefined) {
            if (position.value !== undefined) {
                if (position.value !== "") {
                    local_positions.push(position);
                    for (let i = 0; i < this.getItems[this.#selectedItem].length; i++) {
                        let item = this.getItems[this.#selectedItem];
                        if (item !== undefined) {
                            delete item[i];
                            item.splice(i, 1);
                            break;
                        }
                    }
                    return `Row: ${position.row} Col: ${position.col}`;
                }
            } else {
                for (let i = 0; i < local_positions.length; i++) {
                    if (local_positions[i].row === position.old_row && local_positions[i].col === position.old_col) {
                        local_positions[i].row = position.row;
                        local_positions[i].col = position.col;
                        local_positions[i].old_row = position.old_row;
                        local_positions[i].old_col = position.old_col;
                        return `Row: ${local_positions[i].row}  Col: ${local_positions[i].col}`;
                    }
                }
            }
        }
        if (del === true) {
            let bc;
            try {
                for (let i = 0; i < local_positions.length; i++) {
                    if (local_positions[i].row === position.old_row && local_positions[i].col === position.old_col) {
                        bc = local_positions[i].value.toString();
                        local_positions.splice(i, 1);
                        return bc;
                    }
                }
            } catch (e) {
                console.log('Probably nothing went wrong.');
            }
        }
    }

    makeItemAvailable(menu, valueOfItem) {
        try {
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

    makeItemsUnavailable(positions) {
        let items = this.getItems;

        try {
            for (let typeItem in items) {
                items[typeItem].forEach((item, index) => {
                    positions.forEach(position => {
                        if (item['Naam'] === position['value']) {
                            items[typeItem].splice(index, 1);
                        }
                    });
                });
            }
        } catch (e) {
            console.log('No items available.');
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
            // is current menu my menu
            let menu_items = this.#items_details[activeMenu];
            for (let i = 0; i < menu_items.length; i++) {
                if (menu_items[i].Naam.toString() === nameOfButton) {
                    // current menu is my menu
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
        let retrievedPositions = JSON.parse(localStorage.getItem(this.#name));
        // remove items from menu's
        this.makeItemsUnavailable(retrievedPositions);
        this.#positions = retrievedPositions;
    }

    savePosToLocalStorage() {
        localStorage.setItem(this.#name, JSON.stringify(this.#positions));
    }
}

