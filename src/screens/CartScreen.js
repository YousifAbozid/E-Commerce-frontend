import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import addToCart from '../actions/addToCart' // this is action creator
import Message from '../components/Message'

const CartScreen = ({ match, location, history }) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    return (
        <div>
            cart
        </div>
    )
}

export default CartScreen