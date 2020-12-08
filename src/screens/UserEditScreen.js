import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, FormControl, FormLabel, FormCheck } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import getUserDetailsById from '../actions/user/userDetailsById'

const UserEditScreen = ({ match }) => {
    const userId = match.params.id
    const dispatch = useDispatch()
    const userDetailss = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetailss
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (!user.name || user._id !== userId) {
            dispatch(getUserDetailsById(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [dispatch, userId, user])

    const handleSubmit = (event) => {
        // first prevent the default behavior to not refresh the page
        event.preventDefault()
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loading
                ? <Loader />
                : error[0]
                ? <Message variant='danger' children={error} />
                : <Form onSubmit={handleSubmit}>
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
                    <FormGroup controlId='isadmin'>
                        <FormCheck
                            type='checkbox'
                            label='Is Admin'
                            checked={isAdmin}
                            onChange={({ target }) => setIsAdmin(target.checked)}
                        ></FormCheck>
                    </FormGroup>
                    <Button variant='primary' type='submit'>
                        Update
                    </Button>
                </Form>}
            </FormContainer>
        </>
    )
}

export default UserEditScreen