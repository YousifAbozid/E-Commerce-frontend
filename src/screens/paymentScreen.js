import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    Button,
    Col,
    Form,
    FormGroup,
    FormLabel,
    FormCheck,
} from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import CheckoutSteps from "../components/CheckoutSteps"
import savePaymentMethod from "../actions/order/savePaymentMethod"

// this component is initialized for dealing with more than one payment method, you can simply uncomment the second payment method
// in the return of the component to add this method to the list of payment methods, and everything will works fine.
const PaymentScreen = ({ history }) => {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart
    const [paymentMethod, setPaymentMethod] = useState("PayPal")

    // if there is no shipping address we still need it to finish the payment
    if (!shippingAddress) {
        history.push("/shipping")
    }

    const HandleSubmit = (event) => {
        event.preventDefault()

        // dispatch this to save the payment method to the state and local storage
        dispatch(savePaymentMethod(paymentMethod))

        // then move to the placeorder screen
        history.push("/placeorder")
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Shipping</h1>
            <Form onSubmit={HandleSubmit}>
                <FormGroup
                    onChange={({ target }) => setPaymentMethod(target.value)}
                >
                    <FormLabel as="legend">Select Method</FormLabel>
                    <Col>
                        <FormCheck
                            type="radio"
                            name="paymentMethod"
                            label="PayPal or Credit Card"
                            value="PayPal"
                            id="PayPal"
                            defaultChecked
                        ></FormCheck>
                    </Col>
                    {/* <Col>
                        <FormCheck
                            type='radio'
                            name='paymentMethod2'
                            label='Skrill'
                            value='Skrill'
                            id='Skrill'
                        ></FormCheck>
                    </Col> */}
                </FormGroup>
                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
