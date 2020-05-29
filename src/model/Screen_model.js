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

    set updatePositions(position) {
        console.log(`Given pos: ${position.value} Row: ${position.row}  Col: ${position.col}
        Old col: ${position.old_row}  Old row: ${position.old_col}`);

        if (position){
            if (position.value !== ''){

                this.#positions.push(position);
            } else {
                console.log('true');
                for (let i = 0; i < this.#positions.length; i++) {
                    if (this.#positions[i].row === position.old_row && this.#positions[i].col === position.old_col) {
                        this.#positions[i].row = position.row;
                        this.#positions[i].col = position.col;
                    }
                }
            }
        }

        console.log(this.#positions);
        console.log(this.#positions.length);
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

