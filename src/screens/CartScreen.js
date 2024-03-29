import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
    ListGroupItem,
} from "react-bootstrap"
import addToCart from "../actions/cart/addToCart" // this is action creator
import removeFromCart from "../actions/cart/removeFromCart" // this is action creator
import Message from "../components/Message"

const CartScreen = ({ match, location, history }) => {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split("=")[1]) : 1

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id))
    }

    const handleCheckout = () => {
        history.push("/login?redirect=shipping")
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is Empty, <Link to="/">Go Back?</Link>
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroupItem key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fluid
                                            rounded
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>$ {item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as="select"
                                            value={item.qty}
                                            onChange={({ target }) =>
                                                dispatch(
                                                    addToCart(
                                                        item.product,
                                                        Number(target.value)
                                                    )
                                                )
                                            }
                                        >
                                            {[
                                                ...Array(
                                                    item.countInStock
                                                ).keys(),
                                            ].map((x) => (
                                                <option
                                                    key={x + 1}
                                                    value={x + 1}
                                                >
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() =>
                                                handleRemoveFromCart(
                                                    item.product
                                                )
                                            }
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h2>
                                SubTotal (
                                {cartItems.reduce(
                                    (acc, item) => acc + item.qty,
                                    0
                                )}
                                ) items
                            </h2>
                        </ListGroupItem>
                        <ListGroupItem>
                            Total Price: ${" "}
                            {cartItems
                                .reduce(
                                    (acc, item) => acc + item.qty * item.price,
                                    0
                                )
                                .toFixed(2)}
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button
                                type="button"
                                className="btn-block"
                                disabled={cartItems.length === 0}
                                onClick={handleCheckout}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
