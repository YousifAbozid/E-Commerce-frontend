import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import productListReducer from './reducers/productList'
import productDetailsReducer from './reducers/productDetails'
import cartReducer from './reducers/cart'
import userLoginReducer from './reducers/userLogin'
import userRegisterReducer from './reducers/userRegister'

// create a root reducer
const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
})

// get the cart items from the localStorage
const cartItemsFromStorage = localStorage.getItem('cartItems')
? JSON.parse(localStorage.getItem('cartItems'))
: []

// get the user info from the localStorage
const userInfoFromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
: null

// set the initial state with the data stored in localStorage
const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
}

// create a store to save the state
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store