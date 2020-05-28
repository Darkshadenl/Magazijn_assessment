export default class DragDrop {

    #original_container = '';
    #button_text = '';
    #succesful_drop = false;

    #

    #getDraggableButton(){
        let button = document.createElement('button');
        button.setAttribute('draggable', 'True');
        button.addEventListener('dragstart', this.#dragStart);
        button.addEventListener('dragend', this.#dragEnd);
        button.id = 'dragButton';

        console.log(button);
        return button;
    }

    #dragStart(event) {

        setTimeout(() => {
            this.style.display = 'none';
        }, 0);

        event.target.style.opacity = '.5';
        event.dataTransfer.setData("Text", this.innerText);
        // event.dataTransfer.setData("original_container", this.parentNode.id);
        this.#original_container = this.parentNode;
        this.#button_text = this.innerText;
    }

    #dragEnd(event) {
        console.log('Drag ended');
        let orig_c = document.getElementById(original_container.id);

        if (!succesful_drop){
            let button = getDraggableButton();
            button.innerText = button_text;

            if (original_container.parentNode.id  === 'made_choices'){
                button.className = 'dragButtonV2';
            } else if (original_container.id === 'choice_menu'){
                button.className = 'btn btn-secondary dragButton';
            }
            orig_c.appendChild(button);
        } else {
            this.#succesful_drop = false;
        }
        event.target.style.opacity = "";
        orig_c.firstChild.remove();
    }

    #dragDrop(event) {
        event.preventDefault();

        let button = getDraggableButton();
        button.innerText = event.dataTransfer.getData('Text');

        if (event.target.parentNode.id === 'made_choices'){
            button.className = 'dragButtonV2';
            event.target.style.background = '#E0FFFF';
            this.appendChild(button);
        } else if (event.target.id === 'choice_menu'){
            button.className = 'btn btn-secondary dragButton';
            event.target.style.background = '#A52A2A';
            this.appendChild(button);
        } else {
            this.#succesful_drop = false;
            return;
        }
        this.#succesful_drop = true;
    }

    #dragOver(e) {
        e.preventDefault();
    }

    #dragEnter(e) {
        if (e.target.id === 'choice_menu'){
            e.target.style.background = '#ff706d';
        }
        if (e.target.parentNode.id === 'made_choices'){
            e.target.style.background = '#ff9c93';
        }
    }

    #dragLeave(e) {
        e.preventDefault();
        if (e.target.id === 'choice_menu' || e.target.parentNode.id === 'made_choices'){
            e.target.style.background = '';
        }
    }


}