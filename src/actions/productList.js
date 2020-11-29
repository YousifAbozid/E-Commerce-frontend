import * as types from '../constants/actionTypes'
import * as api from '../api'

// action creator for products list
const productsList = () => async (dispatch) => {
    try {
        // frist dispatch this to set loading to true
        dispatch({ type: types.PRODUCT_LIST_REQUEST })

        // then send request to fetch all products
        const { data } = await api.getProducts()

        // then dispatch this to save the data to the state
        dispatch({
            type: types.PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        // if there is an error dispatch this to add the error to the state
        dispatch({
            type: types.PRODUCT_LIST_FAILURE,
            payload: error.message
        })
    }
}

export default productsList