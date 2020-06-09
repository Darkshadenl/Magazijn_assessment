export default class Wizard_View {

    #wizardController;


    constructor(wizardController) {
        this.#wizardController = wizardController;
        this.#configureBackButton();
    }

    setScreen(screenName) {
        document.getElementById('wizard').style.display = 'inline';
        document.getElementById('item-wizard').style.display = 'inline';
        switch(screenName)
        {
            case 'Kleding':
                document.getElementById('kleding-wizard').style.display = 'inline';
                document.getElementById('tierlantijn-wizard').style.display = 'none';
                document.getElementById('decoratie-wizard').style.display = 'none';
                this.#createFormFields('Kleding');
                // this.#configureForm(document.getElementById('kleding-wizard'));
                break;
            case 'Tierlantijn':
                document.getElementById('kleding-wizard').style.display = 'none';
                document.getElementById('tierlantijn-wizard').style.display = 'inline';
                document.getElementById('decoratie-wizard').style.display = 'none';
                this.#createFormFields('Tierlantijn');
                // this.#configureForm(document.getElementById('tierlantijn-wizard'));
                break;
            case 'Decoratie':
                document.getElementById('kleding-wizard').style.display = 'none';
                document.getElementById('tierlantijn-wizard').style.display = 'none';
                document.getElementById('decoratie-wizard').style.display = 'inline';
                this.#createFormFields('Decoratie');
                // this.#configureForm(document.getElementById('decoratie-wizard'));
                break;
            default:
                document.getElementById('kleding-wizard').style.display = 'none';
                document.getElementById('tierlantijn-wizard').style.display = 'none';
                document.getElementById('decoratie-wizard').style.display = 'none';
                break;
        }
    }

    #createFormFields(form) {
        // <div class="row-cols-1 ml-3">
        //         <div class="col-lg-6">
        //         <h1 class="display-4">Nieuw kleding item</h1>
        //     </div>
        //     </div>

        let data = this.#wizardController.newItemModel(form);

        for (let [key, value] in Object.entries(data)) {
            console.log(`Key: ${key} Value:${value}`);
        }

    }

    #configureForm(form)
    {
        this.#createFormFields(form);

        //object.addEventListener("input", myScript);
        let fields = form.getElementsByTagName("UL");
        let generalFields = document.getElementById('item-wizard').getElementsByTagName("UL");
        for (let field of fields) {
            field.style.display = 'none';
        }
        for (let field of generalFields) {
            field.style.display = 'none';
        }

        fields[0].style.display = 'inline';
        //TODO: laad een voor een alle input velden in een array. Voeg eventlisteners toe die style display aanzetten bij het volgende input veld.
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
            this.#wizardController.getMainController.switchToMagazijn();
        });
    }



    saveNewItem(item) {

    }

}