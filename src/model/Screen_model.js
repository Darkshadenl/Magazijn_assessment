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

    getDataOfPosition(value, row, col) {
        let data = [];
        this.#retrieveItems();

        if (value == undefined) {
            value = this.#findValueOfPosition(row, col);
        }

        for (let categorie in this.#items_details) {
            this.#items_details[categorie].forEach(item => {
                if (item['Naam'] === value) {
                    data = item;
                }
            })
        }
        return data;
    }

    #findValueOfPosition(row, col) {
        let val = '';
        this.#positions.forEach(item => {
            if (item['row'] == row && item['col'] == col) {
                val = item['value'];
            }
        });
        return val;
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
            if (position.value != undefined && position.value != "") {
                local_positions.push(position);
                for (let i = 0; i < this.getItems[this.#selectedItem].length; i++) {
                    let item = this.getItems[this.#selectedItem];
                    if (item !== undefined) {
                        delete item[i];
                        item.splice(i, 1);
                        break;
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

    deleteComment(comment, itemName, soort){
        let items = JSON.parse(localStorage.getItem('items'));
        let products;

        for (let category in items) {
            if (category == this.#name) {
                let subcat = items[category];
                for (let sub in subcat) {
                    if (sub == soort) {
                        products = subcat[sub];
                    }
                }
            }
        }

        let product;
        products.forEach((p, i) => {
            if (p.naam == itemName) {
                product = products[i];
            }
        });

        try {
            let {reacties} = product;
            reacties.forEach((e, i) => {
                if (e == comment) {
                    reacties[i].splice(i, 1);
                }
            });
        } catch (e) {

        }
    }

    saveComments(currentMenu, productName, comment){
        let items = JSON.parse(localStorage.getItem('items'));

        // find product in local storage, and check for comments.
        // also save
        for (let category in items) {
            if (category == this.#name) {
                let subcategories = items[category];
                for (let subcategory in subcategories) {
                    if (subcategory == currentMenu) {
                        let products = subcategories[subcategory];
                        let comments = null;
                        for (let i = 0; i < products.length; i++) {
                            if (products[i].Naam == productName) {
                                if (products[i].reacties == null) {
                                    products[i].reacties = [comment];
                                } else {
                                    products[i].reacties.push(comment);
                                }
                            }
                        }
                    }
                }
            }
        }
        let new_items = JSON.stringify(items);
        localStorage.setItem('items', new_items);
    }
}

