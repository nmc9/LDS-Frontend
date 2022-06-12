export default class HandleValidation {

    handle(rejection){
        if(this.condition(rejection)){
            return true;
        }
        return false;
    }

    condition(rejection){
        return rejection.isValidation()
    }

}
