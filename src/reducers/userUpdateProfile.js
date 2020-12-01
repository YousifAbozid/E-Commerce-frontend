import * as types from '../constants/actionTypes'

const initialState = {
    loading: false,
    success: false,
    userInfo: {},
    error: []
}

const userUpdateProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_UPDATE_PROFILE_REQUEST:
            return { ...state, loading: true }
        case types.USER_UPDATE_PROFILE_SUCCESS:
            return { ...state, success: true, loading: false, userInfo: action.payload, error: [] }
        case types.USER_UPDATE_PROFILE_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

export default userUpdateProfileReducer