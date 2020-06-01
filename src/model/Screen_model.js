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

    updatePositions(position, del) {
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
                console.log(this.#items);
                console.log(this.#items_details);

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
                    }
                }
                return bc;
            } catch (e) {
                console.log('Probably nothing went wrong.');
            }
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

    giveMeMenu(value, active) {
        if (value === undefined) {
            console.log('Undefined value')
        } else {

            // console.log(active);
            // let activeMenuItems = this.#items[active];
            // console.log(activeMenuItems);

            // for (let i = 0; i < this.#items_details.length; i++) {
            //     console.log(this.#items_details[i]);
            //     if (this.#items_details[i].toString() === active) {
            //         console.log(true);
            //     }
            // }

        }
    }

    retrievePositionsFromLocalStorage() {
        this.#positions = JSON.parse(localStorage.getItem(this.#name));
    }

    savePosToLocalStorage() {
        localStorage.setItem(this.#name, JSON.stringify(this.#positions));
    }
}

