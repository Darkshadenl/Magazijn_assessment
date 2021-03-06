export default class Screen {

    // #broeken = ["blauwe broek", "groene broek", "paarse broek"];
    // #sweaters = ["blauwe sweater", "groene sweater", "paarse sweater"];

    constructor(name) {
        this.name = name;
        this.items = ["blauwe sweater", "groene sweater", "paarse sweater"];
        this.retrieveItems();
        this.createDropDownMenu();
    }

    get screenName(){
        return this.name;
    }

    createDropDownMenu() {
        let choice_menu = document.querySelector('.choice_menu');

        if (choice_menu.hasChildNodes()) {
            choice_menu.innerHTML = '';
        }

        if (this.items != null) {
            this.items.forEach(
                element => {
                    let button = this.getDraggableButton();
                    button.className = 'btn btn-secondary dragButton';
                    let buttonText = document.createTextNode(element);
                    button.appendChild(buttonText);
                    choice_menu.appendChild(button);
                }
            );
        }
    }

    retrieveItems(){
        let retrieved = () => {
            return JSON.parse(localStorage.getItem('items'));
        };

        // console.log(retrieved('Kleding'));

        // return items;
    }

    getDraggableButton(){
        let button = document.createElement('button');
        button.setAttribute('draggable', 'True');
        // button.addEventListener('dragstart', dragStart);
        // button.addEventListener('dragend', dragEnd);
        button.id = 'dragButton';
        return button;
    }

}

