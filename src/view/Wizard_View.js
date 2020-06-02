export default class Wizard_View {

    #wizardController;


    constructor(wizardController) {
        this.#wizardController = wizardController;
    }

    setScreen(screenName) {
        switch(screenName)
        {
            case 'Kleding':
                break;
            case 'Tierlantijn':
                break;
            case 'Decoratie':
                break;
        }
    }

    hideScreen() {

    }

    saveNewItem(item) {

    }



}