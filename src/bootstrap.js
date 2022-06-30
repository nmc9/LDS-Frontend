import Config from 'react-native-config'
console.log(Config);
console.log(Config.API_URL);

import "./axios";

import { Platform } from 'react-native'

import Auth from "./Auth";
window.Auth = Auth;

Auth.load();

window.getPlatform = () => {
	return Platform.select({
      android: Platform.Fingerprint,
      ios: Platform.systemName,
      default: "Web Application"
  })
}



window.formatTime = (time) => {
    let hours = time?.hours;
    let minutes = time?.minutes;
    if(hours === undefined){
        return "";
    }
    if(minutes === undefined){
        return "";
    }

    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}


window.formatTimeRange = (start,end) => {
    let _start = formatTime(start);
    let _end = formatTime(end);

    if(_start === "" && _end === ""){

        if(_end === ""){
            return "";
        }else{
            return "Ends At " + _end;
        }
    }

    if(_end === ""){
        return "Starts At " + _start;
    }

    return _start + " to " + _end;
}