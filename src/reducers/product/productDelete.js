import * as types from "../../constants/actionTypes"

const initialState = {}

const productDeleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.PRODUCT_DELETE_REQUEST:
            return { loading: true }
        case types.PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case types.PRODUCT_DELETE_FAILURE:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export default productDeleteReducer
