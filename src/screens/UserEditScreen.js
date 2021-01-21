import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
    Button,
    Form,
    FormGroup,
    FormControl,
    FormLabel,
    FormCheck,
} from "react-bootstrap"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import getUserDetailsById from "../actions/user/userDetailsById"
import userUpdate from "../actions/user/userUpdate"
import * as types from "../constants/actionTypes"

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id
    const dispatch = useDispatch()
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails
    const userUpdatee = useSelector((state) => state.userUpdate)
    const {
        loading: loadingUpdate,
        success: successUpdate,
        error: errorUpdate,
    } = userUpdatee
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: types.USER_UPDATE_RESET })
            history.push("/admin/userlist")
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetailsById(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, history, userId, user, successUpdate])

    const handleSubmit = (event) => {
        // first prevent the default behavior to not refresh the page
        event.preventDefault()

        dispatch(
            userUpdate({
                _id: userId,
                name,
                email,
                isAdmin,
            })
        )
    }

    return (
        <>
            <Link to="/admin/userlist" className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate[0] && (
                    <Message variant="danger" children={errorUpdate} />
                )}
                {loading ? (
                    <Loader />
                ) : error[0] ? (
                    <Message variant="danger" children={error} />
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <FormGroup controlId="name">
                            <FormLabel>Name</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter Name"
                                value={name}
                                onChange={({ target }) => setName(target.value)}
                            ></FormControl>
                        </FormGroup>
                        <FormGroup controlId="email">
                            <FormLabel>Email Address</FormLabel>
                            <FormControl
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={({ target }) =>
                                    setEmail(target.value)
                                }
                            ></FormControl>
                        </FormGroup>
                        <FormGroup controlId="isadmin">
                            <FormCheck
                                type="checkbox"
                                label="Is Admin"
                                checked={isAdmin}
                                onChange={({ target }) =>
                                    setIsAdmin(target.checked)
                                }
                            ></FormCheck>
                        </FormGroup>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default UserEditScreen
