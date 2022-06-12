export default class HandleNoAuth {

    handle(rejection){
        if(this.condition(rejection)){
            // Redirect to login
            window.location.href = "/login" ;
            return true;
        }
        return false;
    }

    condition(rejection){
        return rejection.isUnauthenticated();
    }

}
