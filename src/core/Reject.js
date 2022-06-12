import DefaultHandler from "./handler/DefaultHandler"

export default class Reject {


    /**
     * Create a new Errors instance.
     */
     constructor(error,errorObject) {
        this.raw = error;
        this.data = error.response.data
        this.code = error.response.status;
        this.message = this.data?.message || ""
        this.errors = errorObject;
    }

    setMessage(message){
        this.message = message;
    }

    toString(){
        return this.errors.toString();
    }

    isPermanentRedirect(){
        return this.code === 301 || this.code == 308
    }

    isTemporaryRedirect(){
        return this.code === 302 
        || this.code == 303
        || this.code == 307
    }

    isMissing(){
        return this.code === 404 || this.code === 405
    }

    isExpired(){
        //CSRF Exception
        return this.code === 419
    }

    isTooMany(){
        return this.code === 429
    }

    isTimeout(){
        return this.code === 408 
    }

    isValidation(){
        return this.code === 422
    }

    isUnauthenticated(){
        return this.code === 401
    }

    isForbidden(){
        return this.code === 403
    }

    is300(){
        return 400 > this.code >= 300
    }

    is400(){
        return 500 > this.code >= 400
    }

    is500(){
        return 600 > this.code >= 500
    }

    handleException(handler = null){
        if(handler == null){
            return (new DefaultHandler).handle(this);
        }
        return handler.handle(this);
    }


}
