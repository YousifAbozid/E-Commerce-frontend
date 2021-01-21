import * as types from "../../constants/actionTypes"

const initialState = {
    loading: false,
    success: false,
    error: [],
}

const userUpdateReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_UPDATE_REQUEST:
            return { ...state, loading: true }
        case types.USER_UPDATE_SUCCESS:
            return { ...state, success: true, loading: false, error: [] }
        case types.USER_UPDATE_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case types.USER_UPDATE_RESET:
            return initialState
        default:
            return state
    }
}

export default userUpdateReducer
