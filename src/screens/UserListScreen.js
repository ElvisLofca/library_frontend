import React, {useContext} from 'react';
import {useEffect, useState} from "react";
import {Button, Card, Col, Row, Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Link, useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import AuthContext from "../context/AuthContext";

function UserListScreen(props) {
    const [users, setUsers] = useState([])
    const [usersUpdated, setUsersUpdated] = useState(false)
    let {authTokens} = useContext(AuthContext)
    const history = useNavigate()

    useEffect(() => {
        getUsers()
    }, [usersUpdated])


    let getUsers = async () => {
        let response = await fetch('/api/users/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        setUsersUpdated(true)
        setUsers(data)
    }

    let deleteUser = async (id) => {
        console.log('user deleted')
        fetch(`/api/users/${id}/delete/`, {
            method: 'DELETE',
            'headers': {
                'Content-Type': 'application/json'
            }
        })
        history('/')
    }


    return (
        <div className='mt-5'>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Staff</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        {(user.is_staff === true)
                        ? <td>Yes</td>
                        : <td>No</td>}
                        <td>
                            <Link to={`/users/${user.id}/edit`} state={{data: user}}>
                                <Button className='me-2'>Edit</Button>
                            </Link>

                            <Button className='me-2' variant='danger' onClick={() => {
                                deleteUser(user.id)
                            }}>Delete</Button>

                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>


    )
}

export default UserListScreen;