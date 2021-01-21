import * as types from "../../constants/actionTypes"
import * as api from "../../api"

// action creator to delete product
const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        // first dispatch this to set loading to true
        dispatch({ type: types.PRODUCT_DELETE_REQUEST })

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

        // then send request to delete the product
        await api.deleteProduct(id, configWithToken)

        // then dispatch this to set success to true
        dispatch({
            type: types.PRODUCT_DELETE_SUCCESS,
        })
    } catch (error) {
        // if there is an error dispatch this to add the error to the state
        dispatch({
            type: types.PRODUCT_DELETE_FAILURE,
            payload:
                error.response && error.response.data.error
                    ? error.response.data.error
                    : error.message,
        })
    }
}

export default deleteProduct
