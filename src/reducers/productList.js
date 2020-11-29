import * as types from '../constants/actionTypes'

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case types.PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case types.PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case types.PRODUCT_LIST_FAILURE:
            return { loading: false, products: action.payload }
        default:
            return state
    }
}