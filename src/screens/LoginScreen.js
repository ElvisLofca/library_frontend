import React, {useState, useContext} from 'react';
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import AuthContext from "../context/AuthContext";

function LoginScreen(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate()
    let {loginUser} = useContext(AuthContext)

    return (
        <Form onSubmit={loginUser}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name='username' placeholder="Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type="password" placeholder="Password" />
            </Form.Group>

            <Button type='submit'>
                Login
            </Button>
        </Form>
    );
}

export default LoginScreen;