import * as types from '../constants/actionTypes'

const initialState = {
    products: [],
    loading: false,
    errors: []
}

export const productListReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.PRODUCT_LIST_REQUEST:
            return { ...state, loading: true }
        case types.PRODUCT_LIST_SUCCESS:
            return { ...state, loading: false, products: action.payload }
        case types.PRODUCT_LIST_FAILURE:
            return { ...state, loading: false, errors: state.errors.concat(action.payload) }
        default:
            return state
    }
}