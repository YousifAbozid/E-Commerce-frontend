import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import saveShippingAddress from '../actions/saveShippingAddress'

const ShippingScreen = ({ history }) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const HandleSubmit = (event) => {
        event.preventDefault()

        // dispatch this to save the shipping address to the state and local storage
        dispatch(saveShippingAddress({ address, city, postalCode, country }))

        // then move to the payment screen
        history.push('/payment')
    }

    return (
        <FormContainer>
            <h1>Shipping</h1>
            <Form onSubmit={HandleSubmit}>
                <FormGroup controlId='address'>
                    <FormLabel>Address</FormLabel>
                    <FormControl
                        type='text'
                        placeholder='Enter Address'
                        value={address}
                        required
                        onChange={({ target }) => setAddress(target.value)}
                    ></FormControl>
                </FormGroup>
                <FormGroup controlId='city'>
                    <FormLabel>City</FormLabel>
                    <FormControl
                        type='text'
                        placeholder='Enter City'
                        value={city}
                        required
                        onChange={({ target }) => setCity(target.value)}
                    ></FormControl>
                </FormGroup>
                <FormGroup controlId='postalCode'>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl
                        type='text'
                        placeholder='Enter Postal Code'
                        value={postalCode}
                        onChange={({ target }) => setPostalCode(target.value)}
                    ></FormControl>
                </FormGroup>
                <FormGroup controlId='country'>
                    <FormLabel>Country</FormLabel>
                    <FormControl
                        type='text'
                        placeholder='Enter Country'
                        value={country}
                        required
                        onChange={({ target }) => setCountry(target.value)}
                    ></FormControl>
                </FormGroup>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen