export default class DragDrop {

    #controller;
    #original_container;
    #original_element;
    #textToBeTransfered = '';
    #succesful_drop = false;
    #dragDropSuccess = false;
    #original_pos = [];
    #pos_mouse;
    #originalPosCR;
    #pos_mouseC;
    #pos_mouseR;
    #backupColor;
    #displayingPopup = false;
    #dragStartedCorrectly = false;

    #beingDraggedColor = '#6E2D18';
    #dragOverGridColor = '#12ff00';
    gridCellInUseColor = '#A52A2A';
    oldPositionAfterDragColor = '#E0FFFF';
    #choiceMenuEnterColor = '#FF7663';

    constructor(controller) {
        this.#controller = controller;
    }

    dragStart(e) {
        console.log('run dragStart');
        this.#dragStartedCorrectly = true;
        e.target.backgroundColor = 'black';
        this.#original_element = e.target;

        if (e.target.parentNode.id === 'choice_menu') {
            setTimeout(() => {
                e.target.style.display = 'none';
            }, 0);
            this.#textToBeTransfered = e.target.innerText;
        } else if (e.target.parentNode.className === 'grid-container made_choices') {
            if (!this.#controller.isPosTaken(e.target.id, e.target.parentNode.id)) {
                console.log('Pos is not taken');
                this.#original_pos.pop();
                this.#original_pos.push(e.target.parentNode.id, e.target.id);
                this.#backupColor = e.target.style.backgroundColor;
                e.target.style.backgroundColor = this.oldPositionAfterDragColor;
            } else {
                this.#original_pos.pop();
                this.#original_pos.push(e.target.parentNode.id, e.target.id);
            }
        }
        this.#original_container = e.target.parentNode;
    }

    dragDrop(e) {
        e.preventDefault();
        if (!this.#dragDropSuccess) {
            if (this.#dragStartedCorrectly) {
                if (e.target.parentNode.className === 'grid-container made_choices') {
                    if (this.#controller.isPosTaken(this.#pos_mouseC, this.#pos_mouseR)) {
                        console.log('Position is taken. Do nothing.');
                        this.#succesful_drop = false;
                        this.#dragDropSuccess = true;
                    } else {
                        this.#createPosition(false, this.#textToBeTransfered, e.target.parentNode.id, e.target.id);

                        e.target.setAttribute('draggable', 'True');
                        e.target.addEventListener('dragstart', (e) => {
                            this.dragStart(e);
                        });
                        e.target.addEventListener('drop', (e) => {
                            this.dragDrop(e);
                        });
                        e.target.addEventListener('dragend', (e) => {
                            this.dragEnd(e);
                        });
                        e.target.addEventListener('click', (e) => {
                            this.popupScreen(undefined, e.target.parentNode.id, e.target.id);
                        });
                        e.target.style.backgroundColor = this.gridCellInUseColor;

                        this.#original_element.setAttribute('draggable', 'False');
                        this.#succesful_drop = true;
                        this.#dragDropSuccess = true;
                    }
                } else if (e.target.id === 'choice_menu') {
                    let button = this.getDraggableButton();
                    button.className = 'btn btn-secondary dragButton';

                    // Check current active menu
                    let menu = document.getElementById('dropdown');
                    let activatedMenu = '';
                    menu.childNodes.forEach(element => {
                        if (element.classList.contains('active')) {
                            activatedMenu = element.textContent;
                        }
                    });

                    // Use original positions to find name of button.
                    let nameOfButton = this.#createPosition(true, activatedMenu);
                    // Check if target belongs to currently selected menu
                    let isThisMyMenu = this.#controller.isMyMenu(nameOfButton, activatedMenu);

                    if (isThisMyMenu[0]) {
                        e.target.appendChild(button);
                        this.#controller.getCurrentScreen.makeItemAvailable(activatedMenu, nameOfButton);
                        if (this.#original_element.parentNode.id === 'choice_menu') {
                            button.innerText = this.#textToBeTransfered;
                        } else {
                            if (nameOfButton !== undefined) {
                                button.innerText = nameOfButton;
                            } else {
                                button.innerText = this.#textToBeTransfered;
                            }
                        }
                    } else {
                        this.#controller.getCurrentScreen.makeItemAvailable(isThisMyMenu[1], nameOfButton);
                        // make menu button flicker maybe
                    }
                    e.target.style.backgroundColor = '';
                    this.#succesful_drop = true;
                    this.#dragDropSuccess = true;
                    console.log(this.#succesful_drop);
                } else {
                    console.log('dragDrop laatste else statement.');
                    this.#succesful_drop = false;
                    this.#dragDropSuccess = true;
                    console.log(this.#succesful_drop);
                }
            }
        }
    }

    dragEnd(e) {
        let orig_c = document.getElementById(this.#original_container.id);
        this.#dragStartedCorrectly = false;
        console.log(this.#original_container.parentNode.id);

        if (!this.#succesful_drop) {
            if (this.#original_container.parentNode.id === 'made_choices_table') {
                this.#createPosition(false, undefined, this.#original_pos[0], this.#original_pos[1]);
            } else if (this.#original_container.id === 'choice_menu') {
                let button = this.getDraggableButton();
                button.innerText = this.#textToBeTransfered;
                button.className = 'btn btn-secondary dragButton';
                orig_c.appendChild(button);
            }
        } else {
            if (this.#original_container.id === 'choice_menu') {
                // console.log('Succesful drop in grid. Removing button from choiceMenu.')
            } else {
                e.target.style.backgroundColor = this.oldPositionAfterDragColor;
                // console.log(`Succesful drop in grid.`);
            }
            // e.target.style.opacity = "";
        }
        this.#succesful_drop = false;   // reset van de boolean
        this.#dragStartedCorrectly = false;
        this.#dragDropSuccess = false;
    }

    #createPosition(del, val, row, col) {
        let old_row;
        let old_col;

        if (this.#original_pos[0] === undefined && this.#original_pos[1] === undefined) {
            old_row = -1;
            old_col = -1;
            // console.log('No Original Positions. Setting old values to -1.')
        } else {
            old_row = this.#original_pos[0];
            old_col = this.#original_pos[1];
            // console.log('Old Positions found. Setting up old position values for later use.');
            this.#original_pos.pop();
            this.#original_pos.pop();
        }

        // console.log(`Sending update to model with del: ${del} Value: ${val}  Row: ${row}  Col:${col}   Old-row: ${old_row}  Old-col: ${old_col}`);
        let deleted_pos_value = this.#controller.updateModel({
            value: val,
            row: row,
            col: col,
            old_row: old_row,
            old_col: old_col
        }, del);
        return deleted_pos_value;
    }

    dragOver(e) {
        e.preventDefault();
    }

    dragEnter(e) {
        e.preventDefault();

        if (this.#dragStartedCorrectly) {
            // console.log('Run dragEnter');
            this.#pos_mouseC = e.target.id;
            this.#pos_mouseR = e.target.parentNode.id;
            this.#pos_mouse = this.#pos_mouseC + this.#pos_mouseR;
            this.#originalPosCR = this.#original_pos[1] + this.#original_pos[0];

            if (e.target.id === 'choice_menu') {
                e.target.style.backgroundColor = this.#choiceMenuEnterColor;
            } else if (e.target.parentNode.className === 'grid-container made_choices') {
                if (this.#pos_mouse !== this.#originalPosCR) {
                    if (e.target.draggable !== true) {
                        e.target.style.backgroundColor = this.#dragOverGridColor;
                    }
                }
            }
        }
        // else {
        //
        //     // e.onmousedown(e =>
        //     //     e.onmouseup;
        //     // })
        // }
    }

    dragLeave(e) {
        if (e.target.id === 'choice_menu') {
            e.target.style.backgroundColor = '';
        } else if (e.target.parentNode.className === 'grid-container made_choices') {
            if (e.target.draggable !== true) {
                // if (this.#pos_mouse !== this.#originalPosCR) {
                // console.log('Not Original pos');
                e.target.style.backgroundColor = this.oldPositionAfterDragColor;
                // }
            }
        }
    }

    getDraggableButton() {
        let button = document.createElement('button');
        button.setAttribute('draggable', 'True');

        button.addEventListener('dragstart', (e) => {
            this.dragStart(e)
        });
        button.addEventListener('dragend', (e) => {
            this.dragEnd(e)
        });
        button.addEventListener('dragover', (e) => {
            this.dragOver(e)
        });
        button.addEventListener('dragenter', (e) => {
            this.dragEnter(e)
        });
        button.addEventListener('dragleave', (e) => {
            this.dragLeave(e)
        });
        button.addEventListener('drop', (e) => {
            this.dragDrop(e);
        });

        // button.id = 'dragButton';

        return button;
    }

    popupScreen(value, row, col) {
        let containdiv = document.querySelector('.popup');
        let data;

        if (value === undefined) {
            data = this.#controller.getCurrentScreen.getDataOfPosition(undefined, row, col);
        } else {
            data = this.#controller.getCurrentScreen.getDataOfPosition(value);
        }

        if (this.#displayingPopup === false) {
            this.#displayingPopup = true;
            containdiv.style.display = 'flex';
            this.#buildPopupScreen(containdiv, data);

        }
    }
    #handleImageInput() {
        const preview = document.querySelector('img');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            // convert image file to base64 string
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }
    #buildPopupScreen(containdiv, data) {
        let photoDiv = document.createElement('div');
        photoDiv.className = 'photo';
        let imageUploader = document.createElement('input');
        imageUploader.type = 'file';
        imageUploader.addEventListener('change', () => this.#handleImageInput(), true);
        let imagePreview = document.createElement('img');
        imagePreview.src = ""; //TODO: inladen oude foto
        imagePreview.alt = "Image preview...";
        photoDiv.appendChild(imageUploader);
        photoDiv.appendChild(imagePreview);
        let newDetails = document.createElement('div');
        newDetails.className = 'newDetails';
        let details = document.createElement('div');
        details.className = 'details';
        let form = document.createElement('form');
        form.className = 'item_form';
        form.id = 'formpje';
        let close_button = document.createElement('button');
        close_button.className = "closeButton btn btn-primary";
        close_button.innerText = 'Sluit';
        let new_comment_button = document.createElement('button');
        new_comment_button.className = 'newComment btn btn-primary';
        new_comment_button.innerText = 'Nieuwe opmerking';
        let comment_div = document.createElement('div');
        comment_div.className = 'comments';
        containdiv.appendChild(photoDiv);
        containdiv.appendChild(newDetails);
        details.appendChild(form);
        details.appendChild(new_comment_button);
        details.appendChild(comment_div);
        containdiv.appendChild(details);
        containdiv.appendChild(close_button);

        new_comment_button.addEventListener('click', e => {
            this.#newCommentFunc(e);
        });

        close_button.addEventListener('click', e => {
            this.#exitButtonFunc(e, containdiv, data);
        });

        for (let label in data) {
            if (label != 'reacties') {
                let div = document.createElement('div');
                div.className = 'form-group';

                let input = document.createElement('input');
                input.disabled = true;
                input.id = label;
                input.setAttribute('value', data[label]);
                input.setAttribute('class', 'form-control');

                let lab = document.createElement('label');
                lab.setAttribute('for', label);
                lab.innerText = label.charAt(0).toUpperCase() + label.slice(1);

                div.appendChild(lab);
                div.appendChild(input);
                form.appendChild(div);
            } else if (label == 'reacties') {

                let [...reactie] = data[label];

                let commentSection = document.querySelector('.comments');

                reactie.forEach(r => {
                    let commentEntryDiv = document.createElement('div');
                    commentEntryDiv.className = 'row commententry';
                    let input = document.createElement('input');
                    input.setAttribute('value', r);
                    input.disabled = true;
                    let del = document.createElement('button');
                    del.className = 'btn btn-outline-danger delbutton';
                    del.innerText = 'Delete';

                    commentEntryDiv.appendChild(input);
                    commentEntryDiv.appendChild(del);
                    commentSection.appendChild(commentEntryDiv);

                    del.addEventListener('click', d => {
                        this.#clickDel(d);
                    });
                });

            }
        }
    }

    #newCommentFunc(e) {
        let div = document.createElement('div');
        let deletebtn = document.createElement('button');
        let comments = document.querySelector('.comments');
        let inputComment = document.createElement('input');
        inputComment.className = 'comment';
        div.className = 'row commententry';
        deletebtn.className = 'btn btn-outline-danger delbutton';
        deletebtn.innerText = 'Delete';

        div.appendChild(inputComment);
        div.appendChild(deletebtn);
        comments.appendChild(div);

        deletebtn.addEventListener('click', d => {
            this.#clickDel(d);
        });
    }

    #clickDel(d) {
        this.#deleteComment(d);
        let parent = d.target.parentNode;
        while (parent.firstChild) {
            parent.removeChild(parent.lastChild);
        }
    }

    #deleteComment(d){
        let child = d.target.parentNode.firstChild;
        let comment = child.value;
        let itemName = document.querySelector('#Naam');
        let type = document.querySelector('#type');

        this.#controller.deleteComments(comment, itemName.value, type.value);
    }

    #exitButtonFunc(e, containdiv, data) {
        this.#displayingPopup = false;
        containdiv.style.display = 'none';
        let popup = document.querySelector('.popup');

        this.#saveNewComments(data);

        // close popup
        while (popup.firstChild) {
            popup.removeChild(popup.lastChild);
        }
    }

    #saveNewComments(data){
        let commentsSection = document.querySelector('.comments');
        let comment;
        if (commentsSection !== null) {
            for (let i = 0; i < commentsSection.children.length; i++) {
                let neededElements = commentsSection.children[i].children;
                console.log(neededElements);
                for (let j = 0; j < neededElements.length; j++) {
                    if (neededElements[0].disabled === false) {
                        if (neededElements[0].value !== "") {
                            comment = neededElements[0].value;
                        }
                    }
                }
            }
        }
        let currentMenu = document.querySelector('.active').innerHTML;
        let itemName = data.Naam;
        console.log(comment);
        if (comment != null && comment != undefined) {
            this.#controller.saveComments(currentMenu, itemName, comment);
        }
    }
}