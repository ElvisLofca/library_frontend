import React, {Fragment, useContext, useEffect, useState} from 'react';
import {useParams, useLocation, useNavigate, Navigate} from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import {Image} from "react-bootstrap";
import AuthContext from "../context/AuthContext";

function UserProfileScreen(props) {
    const {id} = useParams()

    const history = useNavigate()
    const location = useLocation();
    let {user: authenticatedUser} = useContext(AuthContext)
    const [user, setUser] = useState(authenticatedUser)
    let {authTokens, LogoutUser} = useContext(AuthContext)


    let updateUser = async () => {
        fetch(`/api/users/profile/`, {
            method: "PUT",
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify(user)
        })
    }


    let handleSubmit = (e) => {
        console.log('updating')
        // e.preventDefault()
        updateUser()
        history('/login')
        LogoutUser()
    }

    return (
        (!user)
            ? <Navigate to={`/users/`}/>
            :  <Fragment>
                <h1 className='mt-3'>Edit User</h1>
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="formBasicId">
                        <Form.Label>User Identification</Form.Label>
                        <Form.Control type="text"  name='id' value={user.user_id}  disabled/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Edit title" defaultValue={user.username} onChange={(e) => {setUser({...user, 'username': e.target.value})}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Edit Email" defaultValue={user.email} onChange={(e) => {setUser({...user, 'email': e.target.value})}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Edit Password" name='password'  defaultValue="" onChange={(e) => {setUser({...user, 'password': e.target.value})}}/>
                    </Form.Group>

                    {user.is_staff
                    ? <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Is Staff" checked={user.is_staff} onChange={(e) => {setUser({...user, 'is_staff': e.target.checked})}}/>
                    </Form.Group>
                    : null
                    }


                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                </Form>
            </Fragment>
    );
}

export default UserProfileScreen;