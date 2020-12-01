import * as types from '../constants/actionTypes'

const initialState = {
    loading: false,
    userInfo: null,
    error: []
}

const userRegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_REGISTER_REQUEST:
            return { ...state, loading: true }
        case types.USER_REGISTER_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload, error: [] }
        case types.USER_REGISTER_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

export default userRegisterReducer