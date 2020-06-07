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
                break;
            case 'Tierlantijn':
                document.getElementById('kleding-wizard').style.display = 'none';
                document.getElementById('tierlantijn-wizard').style.display = 'inline';
                document.getElementById('decoratie-wizard').style.display = 'none';
                break;
            case 'Decoratie':
                document.getElementById('kleding-wizard').style.display = 'none';
                document.getElementById('tierlantijn-wizard').style.display = 'none';
                document.getElementById('decoratie-wizard').style.display = 'inline';
                break;
            default:
                document.getElementById('kleding-wizard').style.display = 'none';
                document.getElementById('tierlantijn-wizard').style.display = 'none';
                document.getElementById('decoratie-wizard').style.display = 'none';
                break;
        }

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