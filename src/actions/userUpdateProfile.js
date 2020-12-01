import * as types from '../constants/actionTypes'
import * as api from '../api'

// action creator for update user data
const userUpdateProfile = (user) => async (dispatch, getState) => {
    try {
        // frist dispatch this to set loading to true
        dispatch({ type: types.USER_UPDATE_PROFILE_REQUEST })

        // get the token from logged in user
        let { userLogin: { userInfo } } = getState()

        // this config which is have a token.
        const configWithToken = {
            headers: {
                Authorization: `bearer ${userInfo.token}`,
                'Content-Type': 'application/json'
            }
        }

        // then send request to update user data
        const { data } = await api.updateUserDetails(user, configWithToken)

        // then dispatch this to save the data to the state
        dispatch({
            type: types.USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
    } catch (error) {
        // if there is an error dispatch this to add the error to the state
        dispatch({
            type: types.USER_UPDATE_PROFILE_FAILURE,
            payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message
        })
    }
}

export default userUpdateProfile