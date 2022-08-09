import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Row, Col, Nav} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {Link, useLocation} from "react-router-dom";
import AuthContext from "../context/AuthContext";

function BookListScreen(props) {
    const [books, setBooks] = useState([])
    let {authTokens} = useContext(AuthContext)
    let {user} = useContext(AuthContext)
    let {LogoutUser} = useContext(AuthContext)

    useEffect(() => {
        getBooks()
    }, [useLocation()])


    let getBooks = async () => {
        console.log(authTokens.access, 'token')
        let response = await fetch('/api/books/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
           if (response.status === 2000){
               setBooks(data)
           }else if (response.statusText === "Unauthorized"){
               LogoutUser()
           }
        setBooks(data)
    }

    return (
        <div className='mt-5'>
            <Row>
                {books.map((book, index) => (
                <Col key={index} sm={12} md={6} lg={4} className='mb-5'>
                    <Card>
                        <Card.Img src={book.image} style={{maxHeight: "200px", objectFit: "cover"}} />
                        <Card.Body>
                            <Card.Title>{book.title}</Card.Title>
                            <Card.Text>{book.description}</Card.Text>
                            {(book.is_available === true)
                                ? <LinkContainer to={`/books/${book.id}`}>
                                        <Button variant='primary'>Read Book</Button>
                                </LinkContainer>
                                :
                                <div>
                                    <p className='text-danger'>Book not available yet!</p>
                                    {user.is_staff ?  <Link to={`/books/${book.id}`} className='btn btn-dark me-2'>
                                            Detail
                                        </Link>
                                        : null}
                                </div>
                            }
                        </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
        </div>
    );
}

export default BookListScreen;