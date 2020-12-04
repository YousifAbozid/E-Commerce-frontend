import * as types from "../constants/actionTypes"

const initialState = {
    loading: false,
    success: false,
    order: {},
    error: [],
}

const orderCreateReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ORDER_CREATE_REQUEST:
            return { ...state, loading: true }
        case types.ORDER_CREATE_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                order: action.payload,
                error: [],
            }
        case types.ORDER_CREATE_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

export default orderCreateReducer
