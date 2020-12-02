import * as types from '../constants/actionTypes'

// action creator for saving the payment method
const savePaymentMethod = (data) => async (dispatch) => {
    // first dispatch this to save payment method to the state
    dispatch({
        type: types.CART_SAVE_PAYMENT_METHOD,
        payload: data
    })

    // after dispatch to the payment method to the localStorage in the browser
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}

export default savePaymentMethod