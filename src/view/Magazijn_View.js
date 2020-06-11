import DragDrop from "./DragDrop";

export default class Magazijn_View {

    #mag_controller;
    #dragDrop;

    constructor(controller) {
        this.#mag_controller = controller;
        this.#dragDrop = new DragDrop(controller);
        this.#createGrid();
        this.#prepareMainMenu();
        this.#configureWizardButton();
        this.#configureWeatherButton();
    }

    #createGrid() {
        let drop_targets = document.getElementById('made_choices_table');

        // remove elements from previous screen
        if (drop_targets.hasChildNodes()) {
            drop_targets.innerHTML = '';
        }

        for (let i = 0; i < 15; i++) {
            let trow = document.createElement('tr');
            trow.className = 'grid-container made_choices';
            trow.id = i.toString();
            trow.setAttribute('draggable', 'false');

            for (let i = 0; i < 15; i++) {
                let gridcell = document.createElement('td');
                gridcell.className = 'list droptarget grid-item';
                gridcell.id = i.toString();
                gridcell.style.background = this.#dragDrop.oldPositionAfterDragColor;
                gridcell.style.background.repeat(0);
                gridcell.setAttribute('draggable', 'false');

                gridcell.addEventListener('click', (e) => {
                    console.log(e.target);
                });

                gridcell.addEventListener('dragover', (e) => {
                    this.#dragDrop.dragOver(e)
                });
                gridcell.addEventListener('dragenter', (e) => {
                    this.#dragDrop.dragEnter(e)
                });
                gridcell.addEventListener('dragleave', (e) => {
                    this.#dragDrop.dragLeave(e)
                });
                gridcell.addEventListener('drop', (e) => {
                    this.#dragDrop.dragDrop(e);
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
        });
    }

    changeScreen(e) {
        this.#mag_controller.updateLocalStorage();  // save positions
        let newProduct = document.getElementById('new_products_button');
        let menuButton = document.getElementById('dropdownMenuButton');
        document.getElementById('new_products_button').style.display = 'block';

        this.#createGrid();
        switch (e.target.innerText) {
            case "Regio 1: Kleding":
                this.#loadPositions(this.#mag_controller.setCurrentScreen(0));
                break;
            case "Regio 2: Tierlantijn":
                this.#loadPositions(this.#mag_controller.setCurrentScreen(1));
                break;
            case "Regio 3: Decoratie":
                this.#loadPositions(this.#mag_controller.setCurrentScreen(2));
                break;
        }

        let cur_screen = this.#mag_controller.getCurrentScreen;

        newProduct.innerHTML = `Nieuwe ${cur_screen.getName} wizard`;
        menuButton.innerHTML = cur_screen.getName;

        let choice_menu = document.querySelector('.choice_menu');

        if (choice_menu.hasChildNodes()) {
            while (choice_menu.firstChild) {
                choice_menu.removeChild(choice_menu.lastChild);
            }
        }
        this.#createDropdownMenu();
    }

    #loadPositions(positions) {
        // find current positions, add these.
        let table = document.getElementById('made_choices_table');

        try {
            positions.forEach(p => {
                let col = p.col;
                let row = p.row;

                for (let i = 0; i < table.childNodes.length; i++) {
                    if (table.childNodes[i].id === row) {
                        let row_children = table.childNodes[i].childNodes;
                        row_children.forEach(r => {
                            if (r.id === col) {
                                r.style.backgroundColor = this.#dragDrop.gridCellInUseColor;
                                r.addEventListener('dragstart', e => {
                                    this.#dragDrop.dragStart(e);
                                });
                                r.addEventListener('dragend', e => {
                                    this.#dragDrop.dragEnd(e);
                                });
                                r.addEventListener('click', e => {
                                    this.#dragDrop.popupScreen(p.value);
                                });
                                r.setAttribute('draggable', 'true');
                            }
                        })
                    }
                }
            });
        } catch (error) {
            console.log('No positions found');
        }
    }

    #createDraggablesMenu(key) {
        let items = this.#mag_controller.getCurrentScreen.getSpecificItems(key);
        let choice_menu = document.querySelector('.choice_menu');

        if (choice_menu.hasChildNodes()) {
            choice_menu.innerHTML = '';
        }

        choice_menu.addEventListener('dragover', (e) => {
            this.#dragDrop.dragOver(e)
        });
        choice_menu.addEventListener('dragenter', (e) => {
            this.#dragDrop.dragEnter(e)
        });
        choice_menu.addEventListener('dragleave', (e) => {
            this.#dragDrop.dragLeave(e)
        });
        choice_menu.addEventListener('drop', (e) => {
            this.#dragDrop.dragDrop(e);
        });

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

        dropDownButton.style.display = 'block';

        if (dropDown.hasChildNodes()) {
            while (dropDown.firstChild) {
                dropDown.removeChild(dropDown.lastChild);
            }
        }

        let foundKey = false;
        if (items != null) {
            for (let [key] of Object.entries(items)) {
                if (!foundKey) {
                    this.#createDraggablesMenu(key);
                    foundKey = true;
                }

                let button = this.#getDropDownLi();
                let buttonText = document.createTextNode(key.toString());
                button.appendChild(buttonText);
                button.addEventListener('click', (ev) => {
                    this.#activeButtons(ev);
                    this.#createDraggablesMenu(key);
                });

                dropDown.appendChild(button);
            }
        }

        if (dropDown.hasChildNodes()) {
            let activated = false;
            while (!activated) {
                dropDown.childNodes.forEach(c => {
                    if (!activated) {
                        c.classList.add('active');
                        activated = true;
                    }
                });
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

    #activeButtons(e) {
        let dropdown_list = document.getElementById('dropdown');
        dropdown_list.childNodes.forEach(c => {
            if (c.classList.contains('active')) {
                c.classList.remove('active');
            }
        });
        e.target.classList.add('active');
    }

    #getDropDownLi() {
        let a = document.createElement('li');
        a.id = 'dropDownButton';
        a.className = 'btn btn-secondary';
        return a;
    }

    #configureWizardButton() {
        let wizardButton = document.getElementById('new_products_button');

        wizardButton.addEventListener('click', ev => {
            this.#mag_controller.updateLocalStorage();
        });
    }

    #configureWeatherButton() {
        let weather_button = document.getElementById('weather_button');

        weather_button.addEventListener('click', (ev => {
            let city = document.getElementById('weather_city').value;
            city = city.replace(/\s/g,'%20');
            let weather = this.#mag_controller.setupWeather(city);
            this.#changeWeatherInfo(weather);
        }));
    }

    #changeWeatherInfo(weather) {
        //console.log(weather);
        document.getElementById('weather_city').value = weather.name;
        let text = "Weer in: " + weather.name + ": " + (weather.temp - 273) + "°C";
        document.getElementById('weather_menu').appendChild(document.createTextNode(text));
    }

    hideScreen() {
        document.getElementById('magazijn').style.display = 'none';
    }


    showScreen() {
        document.getElementById('magazijn').style.display = 'inline';
    }

}


