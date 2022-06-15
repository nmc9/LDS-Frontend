import {SET_USER, SET_TOKEN, SET_AUTH, REMOVE_AUTH} from "./actions.js";

const initState = {
	user: {},
	token: null,
	auth:{},
}

function userReducer(state=initState,action){
	switch(action.type){
		case SET_USER:
		return {...state,user: action.payload};

		case SET_TOKEN:
		return {...state,token: action.payload};

		case SET_AUTH:
		return {...state,auth: action.payload};

		case REMOVE_AUTH:
		return {...state,auth: {}}
		default:
		return state;
	}
}

export default userReducer;