import "./axios";

import AsyncStorage from '@react-native-async-storage/async-storage';

class Auth{
	static set(user,token){
		console.log("SET AUTH");
		AsyncStorage.setItem('@user',JSON.stringify(user)).catch((e) => {console.log("FAIL" + e)});
		axios.defaults.headers.common['Authorization'] = 'Bearer ' +  token
		AsyncStorage.setItem('@token',token)

	}

	static clear(){
		console.log("REMOVE AUTH");

		AsyncStorage.removeItem('@token').then(() => { axios.defaults.headers.common['Authorization'] = 'Bearer ' +  null})
		.catch((e) => {console.log("FAIL" + e)});
		AsyncStorage.removeItem('@user');
	}

	static getUser(){
		return AsyncStorage.getItem('@user');
	}

	static getToken(){
		return AsyncStorage.getItem('@token');
	}

	static load(){
		console.log("LOAD TOKEN");
		AsyncStorage.getItem('@token').then((token) => { axios.defaults.headers.common['Authorization'] = 'Bearer ' +  token})
		.catch(() => {});
	}
}


export default Auth;