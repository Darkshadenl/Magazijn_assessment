export default class Screen_model {

    #items;
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

    getSpecificItems(key) {
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
        console.log(`Del is: ${del}`);
        if (del === undefined || del === false){
            if (position.value !== "" || position.value !== undefined || position.value !== null){
                console.log("New item. Make first position log.");
                this.#positions.push(position);
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
            console.log('deleting');
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
        let myItems;

        for (let [key, value] of Object.entries(retrieved)) {
            if (key.toString() === this.getName.toString()) {
                this.#items = value;
            }
        }
    }

}

