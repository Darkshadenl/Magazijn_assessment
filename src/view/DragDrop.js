export default class DragDrop {

    #controller;
    #original_container;
    #button_text = '';
    #succesful_drop = false;
    #original_pos = [];

    constructor(controller) {
        this.#controller = controller;
    }

    prepareLists() {
        let container_lists = document.querySelectorAll('.list');

        container_lists.forEach(list => {
            list.addEventListener('dragover', (e) => { this.#dragOver(e) });
            list.addEventListener('dragenter', (e) => { this.#dragEnter(e) });
            list.addEventListener('dragleave', (e) => {this.#dragLeave(e) });
            list.addEventListener('drop', (e) => { this.#dragDrop(e) });
        });
    }

    #dragStart(e) {
        if (this.#original_container != null && e.target.parentNode.className !== 'grid-container made_choices'){
            setTimeout(() => {
                e.target.style.display = 'none';
            }, 0);
        }

        if (e.target.parentNode.className === 'grid-container made_choices'){
            e.target.setAttribute('draggable', 'False');
            this.#original_pos.pop();
            this.#original_pos.push({
                "col": e.target.parentNode.id,
                "row": e.target.id
            });
            console.log('original pos init: ' + this.#original_pos);
        }

        e.target.style.opacity = '.5';
        e.dataTransfer.setData("Text", e.target.innerText);
        this.#original_container = e.target.parentNode;
        this.#button_text = e.target.innerText;
    }

    #dragEnd(e) {
        let orig_c = document.getElementById(this.#original_container.id);

        if (!this.#succesful_drop){
            let button = this.getDraggableButton();
            button.innerText = this.#button_text;
            if (this.#original_container.parentNode.id  === 'made_choices'){
                this.#original_container.style.background = '#A52A2A';
            } else if (this.#original_container.id === 'choice_menu'){
                button.className = 'btn btn-secondary dragButton';
                orig_c.appendChild(button);
            }
        } else {
            if (this.#original_container.id === 'choice_menu'){
                orig_c.firstChild.remove();
            }
            e.target.style.opacity = "";
            this.#succesful_drop = false;   // maar het is wel goed gegaan
        }
    }

    #dragDrop(e) {
        e.preventDefault();

        if (e.target.parentNode.className === 'grid-container made_choices'){
            e.target.setAttribute('draggable', 'True');
            e.target.addEventListener('dragstart', (e) => {this.#dragStart(e)});
            e.target.addEventListener('dragend', (e) => {this.#dragEnd(e)});
            this.#succesful_drop = true;
            this.#createPosition(e.dataTransfer.getData('Text'), e.target.parentNode.id, e.target.id);
        } else if (e.target.id === 'choice_menu'){
            let button = this.getDraggableButton();
            button.innerText = e.dataTransfer.getData('Text');
            button.className = 'btn btn-secondary dragButton';
            e.target.style.background = '#A52A2A';
            e.target.appendChild(button);
            this.#succesful_drop = true;
            this.#createPosition(e.dataTransfer.getData('Text'), -1, -1);
        } else {
            this.#succesful_drop = false;
        }
    }

    #createPosition(val, row, col){
        console.log(`New pos: row:  ${row}  col: ${col}`);

        let old_row = -1;
        let old_col = -1;

        console.log("old position: " + this.#original_pos[0]);

        this.#controller.updateModel(  {
            value: val,
            row: row,
            col: col,
            old_row: old_row,
            old_col: old_col
        });
    }

    getDraggableButton(){
        let button = document.createElement('button');
        button.setAttribute('draggable', 'True');
        button.addEventListener('dragstart', (e) => {this.#dragStart(e)});
        button.addEventListener('dragend', (e) => {this.#dragEnd(e)});
        button.id = 'dragButton';

        return button;
    }

    #dragOver(e) {
        e.preventDefault();

    }

    #dragEnter(e) {
        if (e.target.id === 'choice_menu'){
            e.target.style.background = '#ff706d';
        } else if (e.target.parentNode.className === 'grid-container made_choices') {
            e.target.style.background = '#ff9c93';
        }
    }

    #dragLeave(e) {
        e.preventDefault();
        if (e.target.id === 'choice_menu'){
            e.target.style.background = '';
        } else if (e.target.parentNode.className === 'grid-container made_choices'){
            e.target.style.background = '#E0FFFF';
        }
    }
}