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