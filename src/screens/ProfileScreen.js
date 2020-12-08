import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Button, Form, FormGroup, FormControl, FormLabel, Table } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import getUserDetails from '../actions/user/userDetails'
import userUpdateProfile from '../actions/user/userUpdateProfile'
import listMyOrders from '../actions/order/ListMyOrders'
import { LinkContainer } from 'react-router-bootstrap'

const ProfileScreen = ({ history }) => {
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const userUpdateProfileState = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfileState
    const OrderListMy = useSelector(state => state.orderListMy)
    const { loading:loadingOrders, error:errorOrders, orders } = OrderListMy
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        // checks if the user already logged in
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails())
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, user, dispatch])

    const handleSubmit = (event) => {
        // first prevent the default behavior to not refresh the page
        event.preventDefault()

        // checks if the password and confirm password doesn't match
        if (password !== confirmPassword) {
            setMessage('Passwords doesn\'t match')
        } else {
            // if passwords match then dispatch this to send request to the backend to update user data
            dispatch(userUpdateProfile({ id: user._id, name, email, password }))
        }
    }

    return (
        <Row >
            <Col md={3}>
                <h2>User Profile</h2>
                {loading && <Loader />}
                {message && <Message variant='danger' children={message} />}
                {success && <Message variant='success' children={'Profile Updated Successfully'} />}
                {error[0] && <Message variant='danger' children={error} />}
                {userUpdateProfileState.error[0] && <Message variant='danger' children={userUpdateProfileState.error} />}
                <Form onSubmit={handleSubmit}>
                    <FormGroup controlId='name'>
                        <FormLabel>Name</FormLabel>
                        <FormControl
                            type='text'
                            placeholder='Enter Name'
                            value={name}
                            onChange={({ target }) => setName(target.value)}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='email'>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='password'>
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='confirmPassword'>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={({ target }) => setConfirmPassword(target.value)}
                        ></FormControl>
                    </FormGroup>
                    <Button variant='primary' type='submit'>
                        Update Profile
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders
                ? <Loader />
                : errorOrders[0]
                ? <Message variant='danger' children={errorOrders} />
                : <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <thead>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>
                                    {order.isPaid
                                    ? order.isPaid.substring(0, 10)
                                    : <i className='fas fa-times' style={{ color: "red" }}></i>}
                                </td>
                                <td>
                                    {order.isDelivered
                                    ? order.isDelivered.substring(0, 10)
                                    : <i className='fas fa-times' style={{ color: "red" }}></i>}
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn-sm' variant='light'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </thead>
                </Table>}
            </Col>
        </Row>
    )
}

export default ProfileScreen