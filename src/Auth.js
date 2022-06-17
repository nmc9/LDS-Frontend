import "./axios";

import AsyncStorage from '@react-native-async-storage/async-storage';

class Auth{

	static set(user,token){
		console.log("SET AUTH");
		AsyncStorage.setItem('user',JSON.stringify(user)).catch((e) => {console.log(e)});
		axios.defaults.headers.common['Authorization'] = 'Bearer ' +  token
		AsyncStorage.setItem('token',token).catch((e) => {console.log(e, "TOKEN HERE")});

	}

	static clear(){
		AsyncStorage.removeItem('token').then(() => { axios.defaults.headers.common['Authorization'] = 'Bearer ' +  null})
		.catch((e) => {console.log(e)});
		AsyncStorage.removeItem('user');
	}

	static getUser(){
		return AsyncStorage.getItem('user').catch((e) => {console.log(e)});
	}

	static getToken(){
		return AsyncStorage.getItem('token').catch((e) => {console.log(e)});
	}

	static load(callback = null){
		console.log("LOAD TOKEN");
		AsyncStorage.getItem('token').then((token) => { 
			console.log("TOKEN WAS SET");
			console.log(token);
			axios.defaults.headers.common['Authorization'] = 'Bearer ' +  token;
			if(callback){
				callback();
			}
		})
		.catch((e) => {console.log(e)});
	}


}


export default Auth;