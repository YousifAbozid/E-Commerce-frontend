import * as types from '../../constants/actionTypes'
import * as api from '../../api'

// action creator for update user data
const usersList = () => async (dispatch, getState) => {
    try {
        // frist dispatch this to set loading to true
        dispatch({ type: types.USER_LIST_REQUEST })

        // get the token from logged in user
        let { userLogin: { userInfo } } = getState()

        // this config which is have a token.
        const configWithToken = {
            headers: {
                Authorization: `bearer ${userInfo.token}`
            }
        }

        // then send request to get users list
        const { data } = await api.getUsersList(configWithToken)

        // then dispatch this to save the data to the state
        dispatch({
            type: types.USER_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        // if there is an error dispatch this to add the error to the state
        dispatch({
            type: types.USER_LIST_FAILURE,
            payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message
        })
    }
}

export default usersList