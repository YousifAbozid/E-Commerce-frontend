import * as types from '../constants/actionTypes'
import * as api from '../api'

// action creator for user register
const register = (name, email, password) => async (dispatch) => {
    try {
        // frist dispatch this to set loading to true
        dispatch({ type: types.USER_REGISTER_REQUEST })

        // then send request to create new user
        const { data } = await api.userRegister(name, email, password)

        // then dispatch this to save the data to the state
        dispatch({
            type: types.USER_REGISTER_SUCCESS,
            payload: data
        })

        // also save the data to the state as logged in user
        dispatch({
            type: types.USER_LOGIN_SUCCESS,
            payload: data
        })

        // then save the user data in the localStorage
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        // if there is an error dispatch this to add the error to the state
        dispatch({
            type: types.USER_REGISTER_FAILURE,
            payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message
        })
    }
}

export default register