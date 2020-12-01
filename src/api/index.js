import axios from 'axios'

// all requests that related to the products
const urlForProducts = 'http://localhost:5000/api/products'

export const getProducts = () => axios.get(urlForProducts)
export const getProduct = (id) => axios.get(`${urlForProducts}/${id}`)

// all requests that related to the user
const urlForLogin = 'http://localhost:5000/api/users/login'
const urlForRegister = 'http://localhost:5000/api/users'
const urlForUserDetails = 'http://localhost:5000/api/users/profile'

// this config have no token.
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const userLogin = (email, password) => axios.post(urlForLogin, { email, password }, config)
export const userRegister = (name, email, password) => axios.post(urlForRegister, { name, email, password }, config)
export const getUserDetails = (configWithToken) => axios.get(urlForUserDetails, configWithToken)
export const updateUserDetails = ( user, configWithToken) => axios.put(urlForUserDetails, user, configWithToken)