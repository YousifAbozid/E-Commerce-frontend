import * as types from "../constants/actionTypes"

const initialState = {
    loading: true,
    orders: [],
    error: []
}

const orderListMyReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ORDER_LIST_MY_REQUEST:
            return { ...state, loading: true }
        case types.ORDER_LIST_MY_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
                error: [],
            }
        case types.ORDER_LIST_MY_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case types.ORDER_LIST_MY_RESET:
            return state
        default:
            return state
    }
}

export default orderListMyReducer