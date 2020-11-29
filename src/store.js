import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import productListReducer from './reducers/productList'
import productDetailsReducer from './reducers/productDetails'

const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer
})

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store