import DragDrop from "./DragDrop";


export default class Magazijn_View {

    #mag_controller;
    #dragDrop;

    constructor(controller) {
        this.#mag_controller = controller;
        this.#prepareMainMenu();
        this.#createDropTargets();
        this.#dragDrop = new DragDrop();
        this.#createDropDownMenu();
    }

    #createDropTargets() {
        let drop_targets = document.getElementById('made_choices_table');

        // remove elements from previous screen
        if (drop_targets.hasChildNodes()) {
            drop_targets.innerHTML = '';
        }

        for (let i = 0; i < 15; i++) {
            let trow = document.createElement('tr');
            trow.className = 'grid-container made_choices';

            for (let i = 0; i < 15; i++) {
                let theader = document.createElement('td');
                theader.className = 'list droptarget grid-item';
                theader.id = i.toString();
                trow.appendChild(theader);
            }
            drop_targets.appendChild(trow);
        }
    }

    #prepareMainMenu() {
        let elements = [];
        elements.push(document.getElementById('kleding_id'), document.getElementById('tier_id'),
            document.getElementById('decoratie_id'));

        elements.forEach(e => {
            e.addEventListener('click', (e) => {
                this.changeScreen(e);
            })
        })
    }

    changeScreen(e) {
        let newProduct = document.getElementById('new_products_button');
        let choice_menu = document.getElementById('dropdownMenuButton');

        switch (e.target.innerText) {
            case "Regio 1: Kleding":
                this.#mag_controller.setCurrentScreen(0);
                break;
            case "Regio 2: Tierlantijn":
                this.#mag_controller.setCurrentScreen(1);
                break;
            case "Regio 3: Decoratie":
                this.#mag_controller.setCurrentScreen(2);
                break;
        }

        let cur_screen = this.#mag_controller.getCurrentScreen;

        newProduct.innerHTML = `Nieuwe ${cur_screen.getName} wizard`;
        choice_menu.innerHTML = cur_screen.getName;

        this.#createDropDownMenu();
    }

    #createDropDownMenu() {
        let items = this.#mag_controller.getCurrentScreen.getItems;
        let choice_menu = document.querySelector('.choice_menu');

        if (choice_menu.hasChildNodes()) {
            choice_menu.innerHTML = '';
        }

        if (items != null) {
            items.forEach(
                element => {
                    let button = this.#dragDrop.getDraggableButton();
                    button.className = 'btn btn-secondary dragButton';
                    let buttonText = document.createTextNode(element);
                    button.appendChild(buttonText);
                    choice_menu.appendChild(button);
                }
            );
        }
    }
}


