import * as types from '../constants/actionTypes'

const initialState = {
    loading: false,
    user: {},
    error: []
}

const userDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case types.USER_DETAILS_SUCCESS:
            return { ...state, loading: false, user: action.payload, error: [] }
        case types.USER_DETAILS_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case types.USER_DETAILS_RESET:
            return state
        default:
            return state
    }
}

export default userDetailsReducer