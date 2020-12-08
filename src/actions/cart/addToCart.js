import * as types from '../../constants/actionTypes'
import * as api from '../../api'

// action creator for cart
const addToCart = (id, qty) => async (dispatch, getState) => {
    // first get the product from the database
    const { data } = await api.getProduct(id)

    // then dispatch this to add an item to the state
    dispatch({
        type: types.CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    // after dispatch save the cart items to the localStorage in the browser
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export default addToCart