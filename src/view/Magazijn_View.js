import DragDrop from "./DragDrop";


export default class Magazijn_View {

    #dragDrop = new DragDrop();

    // #drop_targets;

    constructor() {
            
    }


    #createDropTargets() {
        let drop_targets = document.getElementById('made_choices');

        // remove elements from previous screen
        if (drop_targets.hasChildNodes()) {
            drop_targets.innerHTML = '';
        }

        for (let i = 0; i < 15; i++) {
            let div = document.createElement('div');
            div.className = 'droptarget grid-item list';
            div.id = i.toString();
            drop_targets.appendChild(div);
        }
    }

    #createDropDownMenu(items) {
        let choice_menu = document.querySelector('.choice_menu');

        if (choice_menu.hasChildNodes()) {
            choice_menu.innerHTML = '';
        }

        if (items != null) {
            items.forEach(
                element => {
                    let button = this.#getDraggableButton();
                    button.className = 'btn btn-secondary dragButton';
                    let buttonText = document.createTextNode(element);
                    button.appendChild(buttonText);
                    choice_menu.appendChild(button);
                }
            );
        }
    }

    #prepareMainMenu() {
        document.getElementById('kleding_id').addEventListener('onclick', this.#changeScreen);
        document.getElementById('tier_id').addEventListener('onclick', this.#changeScreen);
        document.getElementById('decoratie_id').addEventListener('onclick', this.#changeScreen);
    }

    #prepareLists() {
        let container_lists = document.querySelectorAll('.list');

        container_lists.forEach(list => {
            list.addEventListener('dragover', this.#dragOver);
            list.addEventListener('dragenter', this.#dragEnter);
            list.addEventListener('dragleave', this.#dragLeave);
            list.addEventListener('drop', this.#dragDrop);
        });
    }

    #changeScreen(e) {
        let clicked = e.target.innerText;
        let newProduct = document.getElementById('new_products_button');
        let choice_menu = document.getElementById('dropdownMenuButton');

        let mag = index.getMagazijn;

        switch (e.target.innerText) {
            case "Regio 1: Kleding":
                mag.setCurrentScreen = 0;
                break;
            case "Regio 2: Tierlantijn":
                mag.setCurrentScreen = 1;
                break;
            case "Regio 3: Decoratie":
                mag.setCurrentScreen = 2;
                break;
        }

        let cur_screen = index.getMagazijn.getCurrentScreen;

        newProduct.innerText = `Nieuwe ${cur_screen.getName} menu`;
        choice_menu.innerText = cur_screen.getName;

        console.log(cur_screen);

        cur_screen.createDropDownMenu();
    }


