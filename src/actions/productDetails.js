import * as types from '../constants/actionTypes'
import * as api from '../api'

// action creator for product details
const productDetails = (id) => async (dispatch) => {
    try {
        // frist dispatch this to set loading to true
        dispatch({ type: types.PRODUCT_DETAILS_REQUEST })

        // then send request to fetch the product
        const { data } = await api.getProduct(id)

        // then dispatch this to save the data to the state
        dispatch({
            type: types.PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        // if there is an error dispatch this to add the error to the state
        dispatch({
            type: types.PRODUCT_DETAILS_FAILURE,
            payload: error.message
        })
    }
}

export default productDetails