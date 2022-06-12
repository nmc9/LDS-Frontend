import Errors from './Errors';

export default class Settings {
    /**
    * Create a new Settings instance.
    *
    * @param {object} data
    */
    constructor(settings = []) {
        this.settings = settings;
    }

    is(setting){
        if(this.settings.hasOwnProperty(setting)){
            return this.settings[setting];
        }
        return false;
    }
}
