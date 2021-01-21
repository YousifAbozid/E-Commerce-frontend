import * as types from "../../constants/actionTypes"

const initialState = {
    loading: true,
    order: {},
    orderItems: [],
    shippingAddress: {},
    error: [],
}

const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ORDER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case types.ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
                error: [],
            }
        case types.ORDER_DETAILS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

export default orderDetailsReducer
