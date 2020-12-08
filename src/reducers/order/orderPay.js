import * as types from "../../constants/actionTypes"

const initialState = {
    loading: false,
    success: false,
    error: []
}

const orderPayReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ORDER_PAY_REQUEST:
            return { ...state, loading: true }
        case types.ORDER_PAY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: [],
            }
        case types.ORDER_PAY_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case types.ORDER_PAY_RESET:
            return { ...state, success: false, loading: false, error: [] }
        default:
            return state
    }
}

export default orderPayReducer