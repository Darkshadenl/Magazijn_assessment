
export default class Wizard_View {

    #wizardController;
    #currentScreen;
    #inputFields;


    constructor(wizardController) {
        this.#wizardController = wizardController;
        this.#configureBackButton();
    }

    setScreen(screenName) {
        this.#currentScreen = screenName;
        document.getElementById('wizard').style.display = 'inline';
        document.getElementById('wizard_buttons').style.display = 'inline';
        this.#setupForm(screenName);
    }

    #setupForm(form) {
        console.log("setupform");
        this.#inputFields = [];
        let data = this.#wizardController.newItemModel(form);
        let wizard = document.getElementById('wizard');
        let props = data.getProperties;
        this.#configureHeader(wizard);
        for (let prop in props) {
            this.#createFormField(prop, data)
            this.#wizardController.model.addForm();
        }
        this.#configureAddPropertyButton(data);
        this.#configureSaveButton(data);
    }

        #createFormField(prop, currentItem) {
            let wizard = document.getElementById('wizard');

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

            if(currentItem.properties[prop] != "" && currentItem.properties[prop] != undefined)
            {
                input.value = currentItem.properties[prop];
            }
            input.id = `${prop}`;

            input.addEventListener('input', ev => {
                this.#showNextField();
            }, {once: true});

            sGroupText.appendChild(input);
            divOtherInput.appendChild(sGroupText);
            divInput.appendChild(divOtherInput);
            divCol.appendChild(divInput);
            divRow.appendChild(divInput);
            if(this.#inputFields.push(divRow) <= 1 || (currentItem.properties[prop] != "" && currentItem.properties[prop] != undefined))
            {
                divRow.style.display = 'inline';
            }
            else {
                divRow.style.display = 'none';
            }


            wizard.appendChild(divRow);
        }

    #showNextField() {
        console.log(this.#inputFields);
        if(this.#wizardController.model.nextForm()) {
            this.#inputFields[this.#wizardController.model.currentForm - 1].style.display = 'inline';
        }
        else {
            document.getElementById('wizard_save_button').style.display = 'block';
        }
    }



    #hideField(field)
    {

    }


    hideScreen() {
        document.getElementById('wizard').style.display = 'none';
        let buttons = document.getElementById('wizard_buttons');
        buttons.style.display = 'none';
    }

    #configureBackButton() {
        let backButton = document.getElementById('wizard_back_button');
        backButton.style.display = 'block';

        backButton.addEventListener('click', ev => {
            let wizard = document.getElementById('wizard');
            while (wizard.firstChild) {
                wizard.removeChild(wizard.lastChild);
            }
            this.#wizardController.getMainController.switchToMagazijn();
        });
    }

    #refreshView(currentItem) {
        this.#saveLocal(currentItem);
        //remove old fields
        let wizard = document.getElementById('wizard');
        while (wizard.firstChild) {
            wizard.removeChild(wizard.lastChild);
        }
        //add header
        this.#configureHeader(wizard);
        //add new fields
        this.#wizardController.model.resetFormCount();
        this.#inputFields = [];
        let props = currentItem.getProperties;
        for (let prop in props) {
            this.#createFormField(prop, currentItem)
            this.#wizardController.model.addForm();
        }
        //this.#showNextField();
        this.#configureAddPropertyButton(currentItem);
        this.#configureSaveButton(currentItem);

        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    #configureHeader(wizard)
    {
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
    }

    #saveLocal(currentItem) {
        let props = currentItem.getProperties;
        for (let prop in props) {
            if(document.getElementById(prop)) {
                currentItem.properties[prop] = document.getElementById(prop).value;
                console.log(currentItem.properties[prop]);
            }
        }
    }

    #configureAddPropertyButton(currentItem) {
        let newPropertyButton = document.getElementById('wizard_add_property_button');
        newPropertyButton.addEventListener('click', ev => {
            let newPropertyName = document.getElementById('new_property').value;
            currentItem.addProperty(newPropertyName, undefined);
            this.#refreshView(currentItem);
        }, { once: true });
    }


    #configureSaveButton(currentItem) {
        let saveButton = document.getElementById('wizard_save_button');
        saveButton.style.display = 'none';
        saveButton.addEventListener('click', ev => {
            this.#saveLocal(currentItem);
            currentItem.saveToStorage();
            let wizard = document.getElementById('wizard');
            while (wizard.firstChild) {
                wizard.removeChild(wizard.lastChild);
            }
            this.#wizardController.getMainController.switchToMagazijn();
        });
    }
}