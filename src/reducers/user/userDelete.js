import * as types from "../../constants/actionTypes"

const initialState = {
    loading: false,
    success: false,
    error: [],
}

const userDeleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_DELETE_REQUEST:
            return { ...state, loading: true }
        case types.USER_DELETE_SUCCESS:
            return { ...state, success: true, loading: false, error: [] }
        case types.USER_DELETE_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

export default userDeleteReducer
