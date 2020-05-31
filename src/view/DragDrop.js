export default class DragDrop {

    #controller;
    #original_container;
    #original_element;
    #textToBeTransfered = '';
    #succesful_drop = false;
    #original_pos = [];
    #pos_mouse;
    #originalPosCR;
    #pos_mouseC;
    #pos_mouseR;
    #backupColor;

    #dragStartedCorrectly = false;

    #beingDraggedColor = '#6E2D18';
    #dragOverGridColor = '#12ff00';
    #gridCellInUseColor = '#A52A2A';
    #oldPositionAfterDragColor = '#E0FFFF';
    #choiceMenuEnterColor = '#FF7663';

    constructor(controller) {
        this.#controller = controller;
    }

    #dragStart(e) {
        console.log('run dragStart');
        this.#dragStartedCorrectly = true;
        e.target.backgroundColor = 'black';
        this.#original_element = e.target;

        // make button dissapear when moving
        // if (this.#original_container != null && e.target.parentNode.className !== 'grid-container made_choices') {
        if (e.target.parentNode.id === 'choice_menu') {
            setTimeout(() => {
                e.target.style.display = 'none';
            }, 0);
        } else if (e.target.parentNode.className === 'grid-container made_choices') {

            console.log('in made choices start');
            // note original pos in grid
            if (!this.#controller.isPosTaken(e.target.id, e.target.parentNode.id)){
                console.log('Pos is not taken');
                this.#original_pos.pop();
                this.#original_pos.push(e.target.parentNode.id, e.target.id);
                this.#backupColor = e.target.style.backgroundColor;
                e.target.style.backgroundColor = '#E0FFFF';
                this.#textToBeTransfered = e.target.innerText;
            } else {
                e.target.removeEventListener('dragstart');
                e.target.removeEventListener('dragend');

            }
        }
        this.#original_container = e.target.parentNode
        console.log(`Orignal container: ${this.#original_container.id}`);
    }

    #dragDrop(e) {
        e.preventDefault();
        console.log('Run dragDrop');

        if (e.target.parentNode.className === 'grid-container made_choices') {
            if (this.#controller.isPosTaken(this.#pos_mouseC, this.#pos_mouseR)) {
                // faulty drop. Reset to original pos.
                // this.#original_container.style.backgroundColor = this.#backupColor;
                console.log('Position is taken. Do nothing.');
            } else {
                // non-faulty drop. Place on pos.
                console.log('Position available. Place on position.');
                // log data
                console.log(`Position logged: ${this.#createPosition(false, this.#textToBeTransfered, e.target.parentNode.id, e.target.id)}`);

                // prepare new position
                console.log('Setting new pos draggable to True');
                e.target.setAttribute('draggable', 'True');
                e.target.addEventListener('dragstart', (e) => {
                    this.#dragStart(e);
                });
                e.target.addEventListener('drop', (e) => {
                    this.#dragDrop(e);
                });
                e.target.addEventListener('dragend', (e) => {
                    this.#dragEnd(e);
                });

                // repair old position
                // remove eventlistener from original pos if original pos grid dropzone.
                this.#original_element.setAttribute('draggable', 'False');

                this.#succesful_drop = true;
            }
        } else if (e.target.id === 'choice_menu') {
            let button = this.getDraggableButton();
            button.className = 'btn btn-secondary dragButton';
            e.target.style.backgroundColor = '';
            e.target.appendChild(button);
            button.innerText = this.#createPosition(true);
            this.#succesful_drop = true;
        } else {
            this.#succesful_drop = false;
        }
    }

    #dragEnd(e) {
        let orig_c = document.getElementById(this.#original_container.id);
        this.#dragStartedCorrectly = false;
        console.log('run dragEnd');
        console.log(this.#succesful_drop);

        if (!this.#succesful_drop) {
            if (this.#original_container.parentNode.id === 'made_choices') {
                // this.#original_container.style.background = this.#dropzoneColor;
                console.log("Non Succesful drop. Resetting to Grid (not yet).");
            } else if (this.#original_container.id === 'choice_menu') {
                let button = this.getDraggableButton();
                button.innerText = this.#textToBeTransfered;
                button.className = 'btn btn-secondary dragButton';
                orig_c.appendChild(button);
                console.log("Non Succesful drop. Resetting to choice_menu.");
            }
        } else {
            if (this.#original_container.id === 'choice_menu') {
                orig_c.firstChild.remove();
                console.log('Succesful drop in grid. Removing button from choiceMenu.')
            } else {
                e.target.style.backgroundColor = this.#oldPositionAfterDragColor; //
                // this.#original_element.style.backgroundColor = '#E0FFFF';
                console.log(`Succesful drop in grid.`);
            }
            // e.target.style.opacity = "";
            this.#succesful_drop = false;   // reset van de boolean
        }
    }

    #createPosition(del, val, row, col) {
        let old_row;
        let old_col;

        if (this.#original_pos[0] === undefined && this.#original_pos[1] === undefined) {
            old_row = -1;
            old_col = -1;
            console.log('No Original Positions. Setting old values to -1.')
        } else {
            old_row = this.#original_pos[0];
            old_col = this.#original_pos[1];
            console.log('Old Positions found. Setting up old position values for later use.');
            this.#original_pos.pop();
            this.#original_pos.pop();
        }

        console.log(`Sending update to model with    Value: ${val}  Row: ${row}  Col:${col}   Old-row: ${old_row}  Old-coll ${old_col}`);
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

        if (this.#dragStartedCorrectly) {
            console.log('Run dragEnter');
            this.#pos_mouseC = e.target.id;
            this.#pos_mouseR = e.target.parentNode.id;
            this.#pos_mouse = this.#pos_mouseC + this.#pos_mouseR;
            this.#originalPosCR = this.#original_pos[1] + this.#original_pos[0];

            if (e.target.id === 'choice_menu') {
                e.target.style.backgroundColor = '#ff7663';
            } else if (e.target.parentNode.className === 'grid-container made_choices') {
                if (this.#pos_mouse !== this.#originalPosCR) {
                    if (e.target.draggable !== true) {
                        e.target.style.backgroundColor = '#12ff00';
                    }
                }
            }
        } else {
            e.onmousedown(e => {
                e.onmouseup;
            })
        }


    }

    #dragLeave(e) {
        console.log('Run dragLeave');
        if (e.target.id === 'choice_menu') {
            e.target.style.backgroundColor = '';
        } else if (e.target.parentNode.className === 'grid-container made_choices') {
            console.log('Pos is grid.');
            if (e.target.draggable !== true) {
                console.log('Draggable is false');
                if (this.#pos_mouse !== this.#originalPosCR) {
                    console.log('Not Original pos');
                    e.target.style.backgroundColor = '#E0FFFF';
                }
            }
        }
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
                this.#dragDrop(e);
            });
        });
    }
}