export default class HandleFallback {

    handle(rejection){
        if(this.condition(rejection)){
            Toast.title('Error ' + rejection.code).warning().show(rejection.message);
            return true;
        }
        return false;
    }

    condition(rejection){
        return true;
    }


}
