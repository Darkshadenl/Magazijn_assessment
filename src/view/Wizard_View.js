export default class Wizard_View {

    #wizardController;


    constructor(wizardController) {
        this.#wizardController = wizardController;
        this.#configureBackButton();
    }

    setScreen(screenName) {
        document.getElementById('wizard').style.display = 'inline';
        document.getElementById('item-wizard').style.display = 'inline';
        console.log(screenName);
        switch(screenName)
        {
            case 'Kleding':
                document.getElementById('kleding-wizard').style.display = 'inline';
                document.getElementById('tierlantijn-wizard').style.display = 'none';
                document.getElementById('decoratie-wizard').style.display = 'none';
                this.#configureForm(document.getElementById('kleding-wizard'));
                break;
            case 'Tierlantijn':
                document.getElementById('kleding-wizard').style.display = 'none';
                document.getElementById('tierlantijn-wizard').style.display = 'inline';
                document.getElementById('decoratie-wizard').style.display = 'none';
                this.#configureForm(document.getElementById('tierlantijn-wizard'));
                break;
            case 'Decoratie':
                document.getElementById('kleding-wizard').style.display = 'none';
                document.getElementById('tierlantijn-wizard').style.display = 'none';
                document.getElementById('decoratie-wizard').style.display = 'inline';
                this.#configureForm(document.getElementById('decoratie-wizard'));
                break;
            default:
                document.getElementById('kleding-wizard').style.display = 'none';
                document.getElementById('tierlantijn-wizard').style.display = 'none';
                document.getElementById('decoratie-wizard').style.display = 'none';
                break;
        }
    }

    #configureForm(form)
    {
        //object.addEventListener("input", myScript);
        let fields = form.getElementsByTagName("UL");
        let generalFields = document.getElementById('item-wizard').getElementsByTagName("UL");
        for (let field of fields) {
            field.style.display = 'none';
            //field.getElementsByTagName('input').addEventListener(); //function: accesst volgende field (zichtbaar maken) en verwijdert de eventlistener weer.
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