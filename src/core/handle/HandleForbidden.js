export default class HandleForbidden {

    handle(rejection){
        if(this.condition(rejection)){
            Toast.title('Error ' + rejection.code).warning().show("You do not have permission");

            return true;
        }
        return false;
    }

    condition(rejection){
        return rejection.isForbidden();

    }

}
