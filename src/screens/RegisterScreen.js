import React, {useState, useContext} from 'react';
import {Alert, Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import AuthContext from "../context/AuthContext";

function RegisterScreen(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate()
    let {registerUser} = useContext(AuthContext)
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            console.log('registrazione')

            let user = {'username': e.target.username.value,
                'password': e.target.password.value,
                'name': e.target.name.value,
                'email': e.target.email.value
            };

          await registerUser(user)
              .catch(error => {
                  setError(error.message)
              });
        }
        setValidated(true)
    }

    return (
        <>
            {error ?
            <Alert variant='danger'>
                {error}
            </Alert>
                : null
            }

        <Form onSubmit={handleSubmit} noValidate validated={validated} >
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control required type="text" name='username'/>
                <Form.Control.Feedback type="invalid">
                    You must enter a username.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control required type="text" name='name'/>
                <Form.Control.Feedback type="invalid">
                    You must enter a name.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" name='email'/>
                <Form.Control.Feedback type="invalid">
                    You must enter an email.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required name='password' type="password"/>
                <Form.Control.Feedback type="invalid">
                    You must enter a password.
                </Form.Control.Feedback>
            </Form.Group>

            <Button type='submit'>
                Register
            </Button>
        </Form>
        </>
    );
}

export default RegisterScreen;