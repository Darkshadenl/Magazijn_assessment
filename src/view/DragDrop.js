export default class DragDrop {

    #original_container;
    #button_text = '';
    #succesful_drop = false;


    getDraggableButton(){
        let button = document.createElement('button');
        button.setAttribute('draggable', 'True');
        button.addEventListener('dragstart', (e) => {this.#dragStart(e)});
        button.addEventListener('dragend', (e) => {this.#dragEnd(e)});
        button.id = 'dragButton';

        return button;
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

        setTimeout(() => {
            e.target.style.display = 'none';
        }, 0);

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
                button.className = 'dragButtonV2';
            } else if (this.#original_container.id === 'choice_menu'){
                button.className = 'btn btn-secondary dragButton';
            }
            orig_c.appendChild(button);
        } else {
            this.#succesful_drop = false;
        }
        e.target.style.opacity = "";
        orig_c.firstChild.remove();
    }

    #dragDrop(e) {
        e.preventDefault();

        let button = this.getDraggableButton();
        button.innerText = e.dataTransfer.getData('Text');

        if (e.target.parentNode.className === 'grid-container made_choices'){
            button.className = 'dragButtonV2';
            e.target.style.background = '#E0FFFF';
            e.target.appendChild(button);
        } else if (e.target.id === 'choice_menu'){
            button.className = 'btn btn-secondary dragButton';
            e.target.style.background = '#A52A2A';
            e.target.appendChild(button);
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

        if (e.target.parentNode.className === 'grid-container made_choices') {
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