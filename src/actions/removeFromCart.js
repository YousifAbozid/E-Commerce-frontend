import * as types from '../constants/actionTypes'

const removeFromCart = (id) => async (dispatch, getState) => {
    // first dispatch this to remove an item from the state
    dispatch({
        type: types.CART_REMOVE_ITEM,
        payload: id
    })

    // after dispatch remove the cart item from the localStorage in the browser
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export default removeFromCart