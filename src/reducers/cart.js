import * as types from '../constants/actionTypes'

const initialState = {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: ''
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CART_ADD_ITEM:
            //first save the item to a variable
            const item = action.payload

            // then search for it in the state
            const itemExist = state.cartItems.find(i => i.product === item.product)

            // if the item exist in the state
            if (itemExist) {
                // then map throw cartItems in the state and update it maybe the qty has changed
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === itemExist.product ? item : i)
                }
            } else {
                // if the item not exist so add the item to cartItems
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case types.CART_REMOVE_ITEM:
            // return every item in the list except the one we want to remove
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.product !== action.payload)
            }
        case types.CART_SAVE_SHIPPING_ADDRESS:
            // save the shipping address in the state
            return {
                ...state,
                shippingAddress: action.payload
            }
        case types.CART_SAVE_PAYMENT_METHOD:
            // save the payment method in the state
            return {
                ...state,
                paymentMethod: action.payload
            }
        default:
            return state
    }
}

export default cartReducer