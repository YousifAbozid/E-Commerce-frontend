import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as api from "../api"
import { PayPalButton } from "react-paypal-button-v2"
import {
    Row,
    Col,
    ListGroup,
    Image,
    Card,
    ListGroupItem,
} from "react-bootstrap"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { Link } from "react-router-dom"
import getOrderDetails from "../actions/order/getOrderDetails"
import orderPay from "../actions/order/orderPay"
import * as types from "../constants/actionTypes"

const OrderScreen = ({ match }) => {
    const orderId = match.params.id
    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()
    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails
    const orderPayy = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPayy

    if (!loading) {
        // add decimals if is not there
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        // calculate all the items prices
        order.itemsPrice = addDecimals(
            order.orderItems.reduce(
                (acc, item) => acc + item.price * item.qty,
                0
            )
        )
    }

    useEffect(() => {
        // add paypal script with vanilla javascript
        const addPaypalScript = async () => {
            const { data: clientId } = await api.getClientId()
            const script = document.createElement("script")
            script.type = "text/javascript"
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        // use dispatch to get the order details before paying and after to update the state
        // focus here this is important
        if (!order._id || successPay) {
            dispatch({ type: types.ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            // checks if the order isn't paid
            if (!window.paypal) {
                addPaypalScript() // if paypal script isn't there then add it
            } else {
                setSdkReady(true) // if paypal script is there set sdk to true
            }
        }
    }, [dispatch, orderId, order, successPay])

    const handleSuccessPayment = (paymentResult) => {
        console.log(paymentResult)
        dispatch(orderPay(orderId, paymentResult))
    }

    return (
        <>
            {loading ? (
                <Loader />
            ) : error[0] ? (
                <Message variant="danger" children={error} />
            ) : (
                <>
                    <h1>Order {order._id}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name: </strong>{" "}
                                        {order.user.name}
                                    </p>
                                    <p>
                                        <strong>Email: </strong>
                                        <a href={`mailto:${order.user.email}`}>
                                            {order.user.email}
                                        </a>
                                    </p>
                                    <p>
                                        <strong>Address: </strong>
                                        {order.shippingAddress.address},
                                        {order.shippingAddress.city},
                                        {order.shippingAddress.postalCode},
                                        {order.shippingAddress.country}
                                    </p>
                                    {order.isDelivered ? (
                                        <Message variant="success">
                                            Delivered on {order.deliveredAt}
                                        </Message>
                                    ) : (
                                        <Message variant="danger">
                                            Not Delivered
                                        </Message>
                                    )}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method: </strong>
                                        {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? (
                                        <Message variant="success">
                                            Paid on {order.paidAt}
                                        </Message>
                                    ) : (
                                        <Message variant="danger">
                                            Not paid
                                        </Message>
                                    )}
                                </ListGroupItem>
                                <ListGroupItem>
                                    <h2>Order Items</h2>
                                    {order.orderItems.length === 0 ? (
                                        <Message>Order is empty</Message>
                                    ) : (
                                        <ListGroup variant="flush">
                                            {order.orderItems.map(
                                                (item, index) => (
                                                    <ListGroupItem key={index}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image
                                                                    src={
                                                                        item.image
                                                                    }
                                                                    alt={
                                                                        item.name
                                                                    }
                                                                    fluid
                                                                    rounded
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Link
                                                                    to={`/product/${item.product}`}
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            </Col>
                                                            <Col md={4}>
                                                                {item.qty} x $
                                                                {item.price} = $
                                                                {item.qty *
                                                                    item.price}
                                                            </Col>
                                                        </Row>
                                                    </ListGroupItem>
                                                )
                                            )}
                                        </ListGroup>
                                    )}
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup>
                                    <ListGroupItem>
                                        <h2>Order Summary</h2>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>${order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>${order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>${order.taxPrice}</Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Total</Col>
                                            <Col>${order.totalPrice}</Col>
                                        </Row>
                                    </ListGroupItem>
                                    {!order.isPaid && (
                                        <ListGroupItem>
                                            {loadingPay && <Loader />}
                                            {!sdkReady ? (
                                                <Loader />
                                            ) : (
                                                <PayPalButton
                                                    amount={order.totalPrice}
                                                    onSuccess={
                                                        handleSuccessPayment
                                                    }
                                                />
                                            )}
                                        </ListGroupItem>
                                    )}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default OrderScreen
