import * as types from "../../constants/actionTypes"
import * as api from "../../api"

// action creator for create order
const createOrder = (order) => async (dispatch, getState) => {
    try {
        // frist dispatch this to set loading to true
        dispatch({ type: types.ORDER_CREATE_REQUEST })

        // get the token from logged in user
        let {
            userLogin: { userInfo },
        } = getState()

        // this config which is have a token.
        const configWithToken = {
            headers: {
                Authorization: `bearer ${userInfo.token}`,
                "Content-Type": "application/json",
            },
        }

        // then send request to create an order
        const { data } = await api.createOrder(order, configWithToken)

        // then dispatch this to save the data to the state
        dispatch({
            type: types.ORDER_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        // if there is an error dispatch this to add the error to the state
        dispatch({
            type: types.ORDER_CREATE_FAILURE,
            payload:
                error.response && error.response.data.error
                    ? error.response.data.error
                    : error.message,
        })
    }
}

export default createOrder
