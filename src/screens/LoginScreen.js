import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Row, Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userLoginAndLogout'

const LoginScreen = ({ location, history }) => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        // checks if the user already logged in
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const handleSubmit = (event) => {
        // first prevent the default behavior to not refresh the page
        event.preventDefault()

        // then dispatch this to send request to the backend to login
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Log In</h1>
            {loading && <Loader />}
            {error[0] ? <Message variant='danger'>{error}</Message> : null}
            <Form onSubmit={handleSubmit}>
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
                <Button variant='primary' type='submit'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen