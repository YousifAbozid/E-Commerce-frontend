import { useSelector } from 'react-redux'
import * as types from '../constants/actionTypes'
import * as api from '../api'

// action creator for user register
const getUserDetails = () => async (dispatch) => {
    try {
        // frist dispatch this to set loading to true
        dispatch({ type: types.USER_DETAILS_REQUEST })

        // get the token from logged in user
        let { token } = useSelector(state => state.userLogin.userInfo)

        // this config which is have a token.
        const configWithToken = {
            headers: {
                Authorization: `bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }

        // then send request to get user data
        const { data } = await api.getUserDetails(configWithToken)

        // then dispatch this to save the data to the state
        dispatch({
            type: types.USER_DETAILS_SUCCESS,
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
            type: types.USER_DETAILS_FAILURE,
            payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message
        })
    }
}

export default getUserDetails