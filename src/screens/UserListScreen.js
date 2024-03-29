import React, { useEffect } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import Message from "../components/Message"
import usersList from "../actions/user/usersList"
import userDelete from "../actions/user/userDelete"

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch()
    const userList = useSelector((state) => state.userList)
    const { loading, users, error } = userList
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const userDeletes = useSelector((state) => state.userDelete)
    const { success: successDelete } = userDeletes

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(usersList())
        } else {
            history.push("/login")
        }
    }, [dispatch, history, userInfo, successDelete])

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete that user?")) {
            dispatch(userDelete(id))
        }
    }

    return (
        <>
            <h1>Users</h1>
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
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </td>
                                <td>
                                    {user.isAdmin ? (
                                        <i
                                            className="fas fa-check"
                                            style={{ color: "green" }}
                                        ></i>
                                    ) : (
                                        <i
                                            className="fas fa-times"
                                            style={{ color: "red" }}
                                        ></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer
                                        to={`/admin/user/${user._id}/edit`}
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
                                        onClick={() => handleDelete(user._id)}
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

export default UserListScreen
