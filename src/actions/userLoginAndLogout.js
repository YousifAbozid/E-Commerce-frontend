import * as types from '../constants/actionTypes'
import * as api from '../api'

// action creator for user login
export const login = (email, password) => async (dispatch) => {
    try {
        // frist dispatch this to set loading to true
        dispatch({ type: types.USER_lOGIN_REQUEST })

        // then send request to get a token with the correct user credentials
        const { data } = await api.userLogin(email, password)

        // then dispatch this to save the data to the state
        dispatch({
            type: types.USER_LOGIN_SUCCESS,
            payload: data
        })

        // then save the user data in the localStorage
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        // if there is an error dispatch this to add the error to the state
        dispatch({
            type: types.USER_LOGIN_FAILURE,
            payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message
        })
    }
}

// action creator for user logout
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: types.USER_LOGOUT })
}