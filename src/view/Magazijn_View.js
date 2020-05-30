import DragDrop from "./DragDrop";

export default class Magazijn_View {

    #mag_controller;
    #dragDrop;

    constructor(controller) {
        this.#mag_controller = controller;
        this.#dragDrop = new DragDrop(controller);
        this.#createDropTargets();
        setTimeout(() => {
            this.#dragDrop.prepareLists();
        }, 1000);
        this.#prepareMainMenu();
        this.#createDropdownMenu();
        this.#configureWizardButton();

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
            trow.id = i.toString();

            for (let i = 0; i < 15; i++) {
                let gridcell = document.createElement('td');
                gridcell.className = 'list droptarget grid-item';
                gridcell.id = i.toString();
                gridcell.style.background = '#E0FFFF';
                gridcell.style.background.repeat(0);

                gridcell.addEventListener('click', (e) => {
                    console.log(e.target);
                });

                trow.appendChild(gridcell);
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

        this.#createDraggablesMenu();
    }

    #createDraggablesMenu(key) {
        let items = this.#mag_controller.getCurrentScreen.getSpecificItems(key);
        let choice_menu = document.querySelector('.choice_menu');

        if (choice_menu.hasChildNodes()) {
            choice_menu.innerHTML = '';
        }

        if (items != null) {
            items.forEach(e => {
                let button = this.#dragDrop.getDraggableButton();
                button.className = 'btn btn-secondary dragButton';
                let buttonText = document.createTextNode(e.Naam.toString());
                button.appendChild(buttonText);
                choice_menu.appendChild(button);
            });
        }
    }

    #createDropdownMenu() {
        let items = this.#mag_controller.getCurrentScreen.getItems;
        let dropDownButton = document.getElementById('dropdownMenuButton');
        let dropDown = document.getElementById('dropdown');

        if (items != null) {
            for (let [key] of Object.entries(items)) {
                let button = this.#getDropDownLi();
                let buttonText = document.createTextNode(key.toString());
                button.appendChild(buttonText);
                button.addEventListener('click', (ev) => {
                    this.#createDraggablesMenu(key);
                });
                dropDown.appendChild(button);
            }
        }

        dropDownButton.addEventListener('click', (e) => {
            dropDown.childNodes.forEach(x => {
                if (x.id === 'dropDownButton') {
                    if (x.style.display === "none") {
                        x.style.display = "block";
                    } else {
                        x.style.display = "none";
                    }
                }
            })
        });
    }

    #getDropDownLi() {
        let a = document.createElement('li');
        a.id = 'dropDownButton';
        a.className = 'btn btn-secondary';
        return a;
    }

    #configureWizardButton() {
        let wizardButton = document.getElementById('new_products_button');

        wizardButton.setAttribute('href', './view/CreationWizard.html');

    }
}


