import * as types from '../../constants/actionTypes'

const initialState = {
    loading: false,
    users: [],
    error: []
}

const userListReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_LIST_REQUEST:
            return { ...state, loading: true }
        case types.USER_LIST_SUCCESS:
            return { ...state, loading: false, users: action.payload, error: [] }
        case types.USER_LIST_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case types.USER_LIST_RESET:
            return initialState
        default:
            return state
    }
}

export default userListReducer