import axios from 'axios'

// all requests that related to the products
const urlForProducts = 'http://localhost:5000/api/products'

export const getProducts = () => axios.get(urlForProducts)
export const getProduct = (id) => axios.get(`${urlForProducts}/${id}`)

// all requests that related to the user
const urlForLogin = 'http://localhost:5000/api/users/login'
const CRD = 'http://localhost:5000/api/users' // CRUD operations means: Create, Read, Update and Delete.
const urlForUserDetails = 'http://localhost:5000/api/users/profile'

// this config have no token.
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const userLogin = (email, password) => axios.post(urlForLogin, { email, password }, config)
export const userRegister = (name, email, password) => axios.post(CRD, { name, email, password }, config)
export const getUserDetails = (configWithToken) => axios.get(urlForUserDetails, configWithToken, config)
export const getUserDetailsById = (id, configWithToken) => axios.get(`${CRD}/${id}`, configWithToken, config)
export const updateUserDetails = (user, configWithToken) => axios.put(urlForUserDetails, user, configWithToken, config)
export const getUsersList = (configWithToken) => axios.get(CRD, configWithToken)
export const deleteUser = (id, configWithToken) => axios.delete(`${CRD}/${id}`, configWithToken)

// all requests that related to the order
const urlForOrder = 'http://localhost:5000/api/orders'

export const createOrder = (order, configWithToken) => axios.post(urlForOrder, order, configWithToken)
export const getOrderById = (id, configWithToken) => axios.get(`${urlForOrder}/${id}`, configWithToken)
export const updateOrderToPay = (orderId, paymentResult, configWithToken) => axios.put(`${urlForOrder}/${orderId}/pay`, paymentResult, configWithToken)
export const getOrderListMy = (configWithToken) => axios.get(`${urlForOrder}/myorders`, configWithToken)

// all requests that related to paypal
const urlForPaypalClientId = 'http://localhost:5000/api/config/paypal'

export const getClientId = () => axios.get(urlForPaypalClientId)