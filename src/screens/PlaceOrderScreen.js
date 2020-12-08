import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { Link } from 'react-router-dom'
import createOrder from '../actions/order/createOrder'

const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {
        shippingAddress: { address, city, postalCode, country },
        shippingAddress,
        paymentMethod,
        cartItems
    } = cart
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])

    // add decimals if is not there
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    // calculate all the items prices
    const itemsPrice = addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))

    // set the shipping price to 0 if the order is greater than 150
    const shippingPrice = addDecimals(itemsPrice > 150 ? 0 : 50)

    // also set the tax to whatever you want
    const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)))

    // after all calculate everything together
    const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)

    const handlePlaceOrder = () => {
        dispatch(createOrder({
            shippingAddress,
            paymentMethod,
            cartItems,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }))
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {address}, {city}, {postalCode}, {country}
                            </p>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {paymentMethod}
                            </p>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Order Items</h2>
                            {cartItems.length === 0
                            ? <Message>Your cart is empty</Message>
                            : <ListGroup variant='flush'>
                                {cartItems.map((item, index) => (
                                    <ListGroupItem key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = ${item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>}
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
                                    <Col>${itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            {error[0] && <ListGroupItem>
                                <Message variant='danger'>{error}</Message>
                            </ListGroupItem>}
                            <ListGroupItem>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cartItems.length === 0}
                                    onClick={handlePlaceOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen