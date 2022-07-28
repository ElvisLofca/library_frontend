import React, {useState, useEffect, useContext} from 'react';
import {Image, Col, Row, Container, Button} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import AuthContext from "../context/AuthContext";

function BookDetailScreen(props) {
    const [book, setBook] = useState({})
    let {id} = useParams()
    let history = useNavigate()
    let {authTokens, user} = useContext(AuthContext)

    useEffect(() => {
        getBook()
    }, [id, book.image])


    let getBook = async () => {
        let response = await fetch(`/api/books/${id}/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        setBook(data)
    }

    let deleteBook = async () => {
        fetch(`/api/books/${id}/delete/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        history('/books')
    }


    return (
        <Container className='mt-3'>
            <div className='d-flex justify-content-between align-items-center'>
                <Link to='/books' className='btn btn-info my-3'>
                    <i className='fa-solid fa-caret-left'></i> back
                </Link>
                {user && user.is_staff
                    ? <div>
                        <Link to={`/books/${id}/edit`} state={{data: book}} className='btn btn-warning me-2'>
                            <i className='fa-solid fa-file-pen'></i> Edit
                        </Link>
                        <Button variant='danger' onClick={deleteBook}>
                            <i className='fa-solid fa-trash'></i> Delete
                        </Button>
                    </div>
                    : null
                }
            </div>



            <Row>

                <Col xs={4} className='mb-5'>
                    <Image src={book.image} fluid style={{maxHeight: '500px'}}/>
                </Col>

                <Col xs={8}>
                    <h2> <strong>Title: </strong>{book.title}</h2>
                    <h4> <strong>Author: </strong>{book.author}</h4>
                    <h5> <strong>Pages: </strong>{book.pages}</h5>
                    <h5> <strong>Publication Date: </strong>{book.published_at}</h5>
                    <h6> <strong>Trama: </strong> {book.description}</h6>

                </Col>

                <Col xs={12}>
                    <h3>Let the reading begin!</h3>
                    <div style={{fontStyle: 'italic', textAlign: "justify"}}>{book.body}</div>
                </Col>
            </Row>
        </Container>
    );
}

export default BookDetailScreen;