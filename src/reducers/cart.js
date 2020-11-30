import * as types from '../constants/actionTypes'

const initialState = {
    cartItems: []
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
                // then map throw cartItems in the state and return non duplicate items
                // I guess simple we can return the state without any mapping because we are not adding anything new
                // but I'm gonna test this first to see what's going on here.
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
        default:
            return state
    }
}

export default cartReducer