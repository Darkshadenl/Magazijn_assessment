export default class DragDrop {

    #controller;
    #original_container;
    #button_text = '';
    #succesful_drop = false;
    #original_pos = [];
    #dropzoneColor = '#A52A2A';
    #pos_mouse;
    #static_pos;

    constructor(controller) {
        this.#controller = controller;
    }

    prepareLists() {
        let container_lists = document.querySelectorAll('.list');

        container_lists.forEach(list => {
            list.addEventListener('dragover', (e) => {
                this.#dragOver(e)
            });
            list.addEventListener('dragenter', (e) => {
                this.#dragEnter(e)
            });
            list.addEventListener('dragleave', (e) => {
                this.#dragLeave(e)
            });
            list.addEventListener('drop', (e) => {
                this.#dragDrop(e)
            });
            list.addEventListener('dragexit', (e) => {
                this.#dragExit(e)
            });
        });
    }

    #dragStart(e) {
        console.log(e);
        console.log(e.target.id);

        if (this.#original_container != null && e.target.parentNode.className !== 'grid-container made_choices') {
            setTimeout(() => {
                e.target.style.display = 'none';
            }, 0);
        }

        if (e.target.parentNode.className === 'grid-container made_choices') {
            e.target.setAttribute('draggable', 'False');
            this.#original_pos.pop();
            this.#original_pos.push(e.target.parentNode.id, e.target.id);
        }

        e.target.style.backgroundColor = '#6e2d18';
        e.dataTransfer.setData("Text", e.target.innerText);
        this.#original_container = e.target.parentNode;
        this.#button_text = e.target.innerText;
    }

    #dragEnd(e) {
        let orig_c = document.getElementById(this.#original_container.id);

        console.log(this.#succesful_drop);
        if (!this.#succesful_drop) {
            if (this.#original_container.parentNode.id === 'made_choices') {
                // this.#original_container.style.background = this.#dropzoneColor;
                console.log("enter!");
            } else if (this.#original_container.id === 'choice_menu') {
                let button = this.getDraggableButton();
                button.innerText = this.#button_text;
                button.className = 'btn btn-secondary dragButton';
                orig_c.appendChild(button);
            }
        } else {
            if (this.#original_container.id === 'choice_menu') {
                orig_c.firstChild.remove();
            } else {
                e.target.style.backgroundColor = '#E0FFFF';
            }
            // e.target.style.opacity = "";
            this.#succesful_drop = false;   // reset van de boolean
        }
    }

    #dragExit(e){
        console.log("exit");
    }

    #dragDrop(e) {
        e.preventDefault();

        if (e.target.parentNode.className === 'grid-container made_choices') {
            if (e.target.style.background !== '#A52A2A') {
                if (this.#pos_mouse !== this.#static_pos){
                    e.target.setAttribute('draggable', 'True');
                    e.target.addEventListener('dragstart', (e) => {
                        this.#dragStart(e)
                    });
                    e.target.addEventListener('dragend', (e) => {
                        this.#dragEnd(e)
                    });
                    e.target.style.backgroundColor = "#A52A2A";
                    this.#createPosition(e.dataTransfer.getData('Text'), e.target.parentNode.id, e.target.id);
                    this.#original_container.style.background = '#E0FFFF';
                    this.#original_container.setAttribute('draggable', 'False');
                    this.#succesful_drop = true;
                }
            } else {
                this.#succesful_drop = false;
            }
        } else if (e.target.id === 'choice_menu') {
            let button = this.getDraggableButton();
            button.className = 'btn btn-secondary dragButton';
            e.target.style.background = '#A52A2A';
            e.target.appendChild(button);
            button.innerText = this.#createPosition(null, null, null, true);
            this.#succesful_drop = true;
        } else {
            this.#succesful_drop = false;
        }
    }

    #createPosition(val, row, col, del) {
        let old_row;
        let old_col;

        if (this.#original_pos[0] === null && this.#original_pos[1] == null) {
            old_row = -1;
            old_col = -1;
        } else {
            old_row = this.#original_pos[0];
            old_col = this.#original_pos[1];
            this.#original_pos.pop();
            this.#original_pos.pop();
        }

        return this.#controller.updateModel({
            value: val,
            row: row,
            col: col,
            old_row: old_row,
            old_col: old_col
        }, del);
    }

    getDraggableButton() {
        let button = document.createElement('button');
        button.setAttribute('draggable', 'True');
        button.addEventListener('dragstart', (e) => {
            this.#dragStart(e)
        });
        button.addEventListener('dragend', (e) => {
            this.#dragEnd(e)
        });
        button.id = 'dragButton';

        return button;
    }

    #dragOver(e) {
        e.preventDefault();

    }

    #dragEnter(e) {
        e.preventDefault();

        this.#pos_mouse = e.target.id + e.target.parentNode.id;
        this.#static_pos = this.#original_pos[1] + this.#original_pos[0];

        if (e.target.id === 'choice_menu') {
            e.target.style.background = '#ff7663';
        } else if (e.target.parentNode.className === 'grid-container made_choices') {
            if (this.#pos_mouse !== this.#static_pos){
                if (e.target.draggable !== true) {
                    e.target.style.background = '#12ff00';
                }
            }
        }
    }


    #dragLeave(e) {
        if (e.target.id === 'choice_menu') {
            e.target.style.background = '';
        } else if (e.target.parentNode.className === 'grid-container made_choices') {
            if (e.target.draggable !== true) {
                if (this.#pos_mouse !== this.#static_pos){
                    e.target.style.background = '#E0FFFF';
                }
            }
        }
    }
}