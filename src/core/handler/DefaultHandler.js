import HandleNoAuth from "../handle/HandleNoAuth";
import HandleForbidden from "../handle/HandleForbidden";
import HandleTimeout from "../handle/HandleTimeout";
import HandleMissing from "../handle/HandleMissing";
import HandleFallback from "../handle/HandleFallback";
import HandleValidation from "../handle/HandleValidation";

export default class DefaultHandler {


    static getChain(){
        return  [
        new HandleValidation(),
        new HandleNoAuth(),
        new HandleForbidden(),
        new HandleTimeout(),
        new HandleMissing(),
        new HandleFallback(),
        ]
    }


    handle(rejection){
        for (const element of DefaultHandler.getChain()) {
            let handle = element.handle(rejection)
            if(handle){
                return handle;
            }
        }
        return false;
    }

}
