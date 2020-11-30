import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import productListReducer from './reducers/productList'
import productDetailsReducer from './reducers/productDetails'
import cartReducer from './reducers/cart'

const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
? JSON.parse(localStorage.getItem('cartItems'))
: []

const initialState = {
    cart: { cartItems: cartItemsFromStorage }
}

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store