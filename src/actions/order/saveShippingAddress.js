import * as types from '../../constants/actionTypes'

// action creator for saving the shipping address
const saveShippingAddress = (data) => async (dispatch) => {
    // first dispatch this to save shipping address to the state
    dispatch({
        type: types.CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    // after dispatch to the shipping address to the localStorage in the browser
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export default saveShippingAddress