import React, { useEffect } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import Message from "../components/Message"
import productsList from "../actions/product/productsList"
import deleteProduct from "../actions/product/productDelete"

const ProductListScreen = ({ history, match }) => {
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const { loading, products, error } = productList
    const productDelete = useSelector((state) => state.productDelete)
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete,
    } = productDelete
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(productsList())
        } else {
            history.push("/login")
        }
    }, [dispatch, history, userInfo, successDelete])

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete that product?")) {
            dispatch(deleteProduct(id))
        }
    }

    const handleCreateProduct = () => {}

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={handleCreateProduct}>
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger" children={errorDelete} />}
            {loading ? (
                <Loader />
            ) : error[0] ? (
                <Message variant="danger" children={error} />
            ) : (
                <Table striped bordered responsive hover className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer
                                        to={`/admin/product/${product._id}/edit`}
                                    >
                                        <Button
                                            variant="light"
                                            className="btn-sm"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() =>
                                            handleDelete(product._id)
                                        }
                                    >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default ProductListScreen
