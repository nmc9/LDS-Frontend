import {SET_USER, SET_TOKEN} from "./actions.js";

const initState = {
	user: {},
	token: null,
}

function userReducer(state=initState,action){
	switch(action.type){
		case SET_USER:
		return {...state,user: action.payload};

		case SET_TOKEN:
		return {...state,token: action.payload};

		default:
		return state;
	}
}

export default userReducer;