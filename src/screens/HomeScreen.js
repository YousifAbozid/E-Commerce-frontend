import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import productsList from '../actions/productList'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    // below this is destructuring for productList and I can put it in the line above but I let it here for explanation and to simplify
    const { products, loading, error } = productList

    useEffect(() => {
        dispatch(productsList())
    }, [dispatch])

    return (
        <div>
            <h1>Latest Products</h1>
            {loading
            ? <Loader />
            : error[0]
            ? <Message variant="danger" children="Products Not Found" />
            : <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>}
        </div>
    )
}

export default HomeScreen