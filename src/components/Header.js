import React, {Fragment, useContext, useEffect, useState} from "react";
import {Container, Navbar, Nav, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {useLocation, useNavigate} from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Header(props) {
    let navigate = useNavigate();
    let {user} = useContext(AuthContext);
    let {LogoutUser} = useContext(AuthContext)


    useEffect(() => {

    }, [useLocation()])


    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Library</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='mr-auto'>
                            <LinkContainer to='/'>
                                <Nav.Link><i className="fa-solid fa-house me-2"></i>Home</Nav.Link>
                            </LinkContainer>

                            {(user)
                                ? <LinkContainer to='/books'>
                                    <Nav.Link><i className="fa-solid fa-book me-2"></i>Books List</Nav.Link>
                                </LinkContainer>
                                : null
                            }


                            {user && user.is_staff === true
                                ? <LinkContainer to='/books/add' state={{data:null}}>
                                    <Nav.Link><i className="fa-solid fa-plus me-2"></i>Add Book</Nav.Link>
                                </LinkContainer>
                                : null
                            }



                            {(user)

                                ? <NavDropdown title={user.username}>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    {user.is_staff ?
                                        <Fragment>
                                            <LinkContainer to='/users/'>
                                                <NavDropdown.Item>Users List</NavDropdown.Item>
                                            </LinkContainer>

                                        </Fragment>
                                        : null
                                    }

                                    <NavDropdown.Item onClick={LogoutUser}>Logout</NavDropdown.Item>
                                </NavDropdown>
                                :
                                <Fragment>
                                    <LinkContainer to='/login/'>
                                        <Nav.Link><i className='fas fa-user me-2'></i>Login</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/register/'>
                                        <Nav.Link><i className='fas fa-key me-2'></i>Register</Nav.Link>
                                    </LinkContainer>
                                </Fragment>

                            }


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;