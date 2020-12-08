import * as types from '../../constants/actionTypes'
import * as api from '../../api'

// action creator for delete user
const userDelete = (id) => async (dispatch, getState) => {
    try {
        // frist dispatch this to set loading to true
        dispatch({ type: types.USER_DELETE_REQUEST })

        // get the token from logged in user
        let { userLogin: { userInfo } } = getState()

        // this config which is have a token.
        const configWithToken = {
            headers: {
                Authorization: `bearer ${userInfo.token}`
            }
        }

        // then send request to delete user
        await api.deleteUser(id, configWithToken)

        // then dispatch this to save the data to the state
        dispatch({ type: types.USER_DELETE_SUCCESS })
    } catch (error) {
        // if there is an error dispatch this to add the error to the state
        dispatch({
            type: types.USER_DELETE_FAILURE,
            payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message
        })
    }
}

export default userDelete