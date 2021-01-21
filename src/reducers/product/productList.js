import * as types from "../../constants/actionTypes"

const initialState = {
    products: [],
    loading: false,
    error: [],
}

const productListReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.PRODUCT_LIST_REQUEST:
            return { ...state, loading: true }
        case types.PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload, error: [] }
        case types.PRODUCT_LIST_FAILURE:
            return { ...state, loading: false, error: [action.payload] }
        default:
            return state
    }
}

export default productListReducer
