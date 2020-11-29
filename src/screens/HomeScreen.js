import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { productsList } from '../actions/product'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    // below this is destructuring for productList and I can put it in the line above but I let it here for explanation and to simplify
    const { products, loading, errors } = productList

    useEffect(() => {
        dispatch(productsList())
    }, [dispatch])

    return (
        <div>
            <h1>Latest Products</h1>
            {loading
            ? <h2>Loading...</h2>
            : errors.length >= 1
            ? <h3>error...</h3>
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