import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap'
import productDetails from '../actions/product/productDetails' // this is action creator
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const id = match.params.id
    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetail

    useEffect(() => {
        dispatch(productDetails(id))
    }, [dispatch, id])

    const handleSubmit = () => {
        history.push(`/cart/${id}/?qty=${qty}`)
    }

    return (
        <>
            <Link to="/" className="btn btn-light my-3">
                Go Back
            </Link>
            {loading
            ? <Loader />
            : error[0]
            ? <Message variant="danger" children="Product Not Found" />
            : <Row>
                <Col md={6}>
                    <Image fluid src={product.image} alt={product.name} />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h3>{product.name}</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating value={product.rating} text={` ${product.numReviews} reviews`} />
                        </ListGroupItem>
                        <ListGroupItem>
                            Price: ${product.price}
                        </ListGroupItem>
                        <ListGroupItem>
                            Description: {product.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            {product.countInStock > 0 && 
                            <ListGroupItem>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                        <Form.Control
                                            as="select"
                                            value={qty}
                                            onChange={({ target }) => setQty(target.value)}
                                        >
                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroupItem>}
                            <ListGroupItem>
                                <Button
                                    onClick={handleSubmit}
                                    type="button"
                                    className="btn-block"
                                    disabled={product.countInStock === 0}
                                >
                                    Add To Cart
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>}
        </>
    )
}

export default ProductScreen