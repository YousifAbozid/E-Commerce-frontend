import * as types from "../../constants/actionTypes"
import * as api from "../../api"

// action creator for list-my order
const listMyOrders = () => async (dispatch, getState) => {
    try {
        // frist dispatch this to set loading to true
        dispatch({ type: types.ORDER_LIST_MY_REQUEST })

        // get the token from logged in user
        let {
            userLogin: { userInfo },
        } = getState()

        // this config which is have a token.
        const configWithToken = {
            headers: {
                Authorization: `bearer ${userInfo.token}`,
            },
        }

        // then send request to get the orders list-my
        const { data } = await api.getOrderListMy(configWithToken)

        // then dispatch this to save the data to the state
        dispatch({
            type: types.ORDER_LIST_MY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        // if there is an error dispatch this to add the error to the state
        dispatch({
            type: types.ORDER_PAY_FAILURE,
            payload:
                error.response && error.response.data.error
                    ? error.response.data.error
                    : error.message,
        })
    }
}

export default listMyOrders
