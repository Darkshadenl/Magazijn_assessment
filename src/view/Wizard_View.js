
export default class Wizard_View {

    #wizardController;
    #currentScreen;


    constructor(wizardController) {
        this.#wizardController = wizardController;
        this.#configureBackButton();
    }

    setScreen(screenName) {
        this.#currentScreen = screenName;
        document.getElementById('wizard').style.display = 'inline';
        this.#setupForm(screenName);
    }

    #setupForm(form)
    {
        let data = this.#wizardController.newItemModel(form);
        let props = data.getProperties;

        let wizard = document.getElementById('wizard');

        let headerDivRow = document.createElement('div');
        headerDivRow.className = 'row-cols-1 ml-3';
        let headerDivCol = document.createElement('div');
        headerDivRow.className = 'col-lg-6';
        let header = document.createElement('h1');
        header.className = 'display-4';
        header.innerText = `Nieuw ${this.#currentScreen} item`;

        headerDivCol.appendChild(header);
        headerDivRow.appendChild(headerDivCol);
        wizard.appendChild(headerDivRow);

        for (let prop in props) {
            let divRow = document.createElement('div');
            divRow.className = 'row-cols-1';
            let divCol = document.createElement('div');
            divCol.className = 'col-lg-6';
            let divInput = document.createElement('div');
            divInput.className = 'input-group mb-3 ml-3 mr-3';
            let divOtherInput = document.createElement('div');
            divOtherInput.className = 'input-group-prepend';
            let sGroupText = document.createElement('span');
            sGroupText.className = 'input-group-text';
            sGroupText.innerText = `${prop}`;
            let input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('aria-label', 'Default');
            input.setAttribute('aria-describedby', 'inputGroup-sizing-default');
            input.className = 'form-control';
            input.id = `${prop}`;

            sGroupText.appendChild(input);
            divOtherInput.appendChild(sGroupText);
            divInput.appendChild(divOtherInput);
            divCol.appendChild(divInput);
            divRow.appendChild(divInput);

            wizard.appendChild(divRow);
        }



    }

    #hideField(field)
    {
        console.log(field);

    }


    hideScreen() {
        document.getElementById('wizard').style.display = 'none';
    }

    #configureBackButton() {
        let backButton = document.getElementById('wizard_back_button');


        backButton.addEventListener('click', ev => {
            let wizard = document.getElementById('wizard');
            while (wizard.firstChild) {
                wizard.removeChild(wizard.lastChild);
            }
            this.#wizardController.getMainController.switchToMagazijn();
        });
    }

    saveNewItem(item) {

    }



}