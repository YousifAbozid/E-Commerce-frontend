import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import productListReducer from "./reducers/product/productList"
import productDetailsReducer from "./reducers/product/productDetails"
import cartReducer from "./reducers/cart/cart"
import userLoginReducer from "./reducers/user/userLogin"
import userRegisterReducer from "./reducers/user/userRegister"
import userDetailsReducer from "./reducers/user/userDetails"
import userUpdateProfileReducer from "./reducers/user/userUpdateProfile"
import userListReducer from "./reducers/user/userList"
import orderCreateReducer from "./reducers/order/orderCreate"
import orderDetailsReducer from "./reducers/order/orderDetails"
import orderPayReducer from "./reducers/order/orderPay"
import orderListMyReducer from "./reducers/order/orderListMy"
import userDeleteReducer from "./reducers/user/userDelete"
import userUpdateReducer from "./reducers/user/userUpdate"

// create a root reducer
const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
})

// get the cart items from the localStorage
const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : []

// get the user info from the localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null

// get the shipping address from the localStorage
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {}

// get the payment method from the localStorage
const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : ""

// set the initial state with the data stored in localStorage
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage,
    },
    userLogin: {
        userInfo: userInfoFromStorage,
        error: [],
    },
}

// create a store to save the state
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store
