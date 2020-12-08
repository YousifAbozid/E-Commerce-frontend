import * as types from '../../constants/actionTypes'

const initialState = {
    loading: false,
    userInfo: null,
    error: []
}

const userLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_lOGIN_REQUEST:
            return { ...state, loading: true }
        case types.USER_LOGIN_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload, error: [] }
        case types.USER_LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case types.USER_LOGOUT:
            return { loading: false, userInfo: null, error: [] }
        default:
            return state
    }
}

export default userLoginReducer