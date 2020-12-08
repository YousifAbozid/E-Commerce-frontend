import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Row, Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import register from '../actions/user/userRegister'

const RegisterScreen = ({ location, history }) => {
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
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

        // checks if the password and confirm password doesn't match
        if (password !== confirmPassword) {
            setMessage('Passwords doesn\'t match')
        } else {
            // if passwords match then dispatch this to send request to the backend to register new user
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {loading && <Loader />}
            {message && <Message variant='danger' children={message} />}
            {error[0] && <Message variant='danger' children={error} />}
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
                    Sign Up
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Already Customer?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen