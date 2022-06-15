export const SET_USER = 'SET_USER';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_AUTH = 'SET_AUTH';
export const REMOVE_AUTH = 'REMOVE_AUTH'

export const setUser = user => dispatch => {
	dispatch({
		type: SET_USER,
		payload:user,
	})
}

export const setToken = token => dispatch => {

	dispatch({
		type: SET_TOKEN,
		payload:token,
	})
}

export const setAuth = auth => dispatch => {
	dispatch({
		type: SET_AUTH,
		payload:auth,
	})
}

export const removeAuth = () => dispatch => {
	dispatch({
		type: REMOVE_AUTH,
		payload:{},
	})
}