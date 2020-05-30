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

    updatePositions(position, del) {
        if (del === false || del === undefined){
            if (position.value !== ''){
                this.#positions.push(position);
            } else {
                for (let i = 0; i < this.#positions.length; i++) {
                    if (this.#positions[i].row === position.old_row && this.#positions[i].col === position.old_col) {
                        this.#positions[i].row = position.row;
                        this.#positions[i].col = position.col;
                        this.#positions[i].old_row = position.old_row;
                        this.#positions[i].old_col = position.old_col;
                    }
                }
            }
        }
        if (del === true){
            console.log('true');
            let bc;
            for (let i = 0; i < this.#positions.length; i++) {
                if (this.#positions[i].row === position.old_row && this.#positions[i].col === position.old_col) {
                    console.log('true in for loop');
                    bc = this.#positions[i].value.toString();
                    this.#positions.splice(i, 1);
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

