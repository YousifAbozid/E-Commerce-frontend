import * as types from '../../constants/actionTypes'

const initialState = {
    product: {
        reviwes: []
    },
    loading: false,
    error: []
}

const productDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true }
        case types.PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload, error: [] }
        case types.PRODUCT_DETAILS_FAILURE:
            return { ...state, loading: false, error: [action.payload] }
        default:
            return state
    }
}

export default productDetailsReducer