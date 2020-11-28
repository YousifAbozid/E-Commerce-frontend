import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { getProducts } from '../api'

const HomeScreen = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
            .then((response) => setProducts(response.data))
            .catch((error) => console.log(error))
    }, [])

    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen