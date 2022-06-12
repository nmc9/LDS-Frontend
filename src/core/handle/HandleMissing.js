export default class HandleMissing {

    handle(rejection){
        if(this.condition(rejection)){
            Toast.title('Error ' + rejection.code).warning().show("Page Not Found");
            return true;
        }
        return false;
    }

    condition(rejection){
        return rejection.isPermanentRedirect()
        || rejection.isTemporaryRedirect()
        || rejection.isMissing()
    }

}
