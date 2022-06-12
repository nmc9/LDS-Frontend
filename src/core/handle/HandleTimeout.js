export default class HandleTimeout {

    handle(rejection){
        if(this.condition(rejection)){
            alert("Please refresh the page")
            return true;
        }
        return false;
    }

    condition(rejection){
        return rejection.isExpired()
        || rejection.isTooMany()
        || rejection.isTimeout();
    }

}
