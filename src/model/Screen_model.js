export default class Screen_model {

    #items_details;
    #items;
    #selectedItem;
    #name;
    #positions = [];

    constructor(name) {
        this.#name = name;
        this.#retrieveItems();
    }

    get getName() {
        return this.#name;
    }

    get getItems() {
        return this.#items;
    }

    get getPositions(){
        return this.#positions;
    }

    getSpecificItems(key) {
        this.#selectedItem = key;
        return this.#items[key];
    }

    checkForPos(posC, posR){
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
        if (del === false || del === undefined){
            if (position.value !== "" || position.value !== undefined || true){
                console.log("New item. Make first position log.");
                this.#positions.push(position);
                console.log('Removing from available items.')

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
        if (del === true){
            console.log('Deleting...');
            let bc;
            for (let i = 0; i < this.#positions.length; i++) {
                if (this.#positions[i].row === position.old_row && this.#positions[i].col === position.old_col) {
                    bc = this.#positions[i].value.toString();
                    this.#positions.splice(i, 1);
                    console.log('Position deleted.');
                }
            }
            return bc;
        }
        console.log(this.#positions);
    }

    #retrieveItems() {
        let retrieved = JSON.parse(localStorage.getItem('items'));

        for (let [key, value] of Object.entries(retrieved)) {
            if (key.toString() === this.getName.toString()) {
                this.#items_details = value;
                this.#items = value;
            }
        }
    }

    storeNewItem() {

        let formData = {};
        let itemName = "TODO";

        //iterate over every input field, and save its name and data


        var formJSON = JSON.stringify(formData);

        localStorage.setItem(itemName, formJSON);
    }

}

