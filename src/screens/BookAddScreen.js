import React, {Fragment, useContext, useEffect} from 'react';
import {Form, InputGroup, Button} from "react-bootstrap";
import {useParams, useNavigate, useLocation} from "react-router-dom";
import {useState} from "react";
import {Image} from "react-bootstrap";
import AuthContext from "../context/AuthContext";

function BookAddScreen(props) {

    const {id} = useParams()
    const history = useNavigate()
    const location = useLocation();
    const data = location.state ? location.state.data : null;
    const [book, setBook] = useState({})
    const [bookImagePreview, setBookImagePreview] = useState(data ? data.image : null)
    let {authTokens} = useContext(AuthContext)
    const [bookCreated, setBookCreated] = useState(false)
    const [validated, setValidated] = useState(false);



    useEffect(() => {

        console.log(data)

        if(data){
            setBook(data)
        }else{
            setBook({})
        }

    }, [setBookCreated, location])


    /** Creating Book **/
    let addBook = async () => {
        return await fetch('/api/books/add/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify(book)
        })
            .then( response => response.json())
            .then((data) => {
                UploadBookImage(data.id)
                return data.id
            })
    }

    /** Updating Book **/
    let updateBook = async () => {
        await fetch(`/api/books/${id}/edit/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify(book)
        })
            .then( response => response.json())
            .then(data => {
                console.log(data)
                UploadBookImage(data.id)
            })

        return id;
    }


    /** Upload Book Image **/
    let  UploadBookImage = async (id) => {
        console.log(id, 'uploading')
        if(book.image) {
            console.log(id, 'calling')
            const imageData = new FormData();
            imageData.append('image', book.image);
            fetch(`/api/books/${id}/upload/`, {
                method: "PUT",
                'headers': {
                    'Authorization': 'Bearer ' + String(authTokens.access)
                    // 'Content-Type': 'application/json'
                },
                body: imageData
            })
        }
    }


    let handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }else {

            let bookId = (data)
                ? await updateBook()
                : await addBook()
            setBookCreated(true)
            history(`/books/${bookId}/`)
        }

        setValidated(true);
    }



    return (
        <Fragment>
            <h1 className='mt-3'>Add Book</h1>
            <Form onSubmit={handleSubmit} noValidate validated={validated} autoComplete='off'>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control required type="text" placeholder="Title" defaultValue={book.title} onChange={(e) => {setBook({...book, 'title': e.target.value})}}/>
                    <Form.Control.Feedback type="invalid">
                        Title missing!
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAuthor">
                    <Form.Label>Author</Form.Label>
                    <Form.Control required type="text" placeholder="Author" defaultValue={book.author} onChange={(e) => {setBook({...book, 'author': e.target.value})}}/>
                    <Form.Control.Feedback type="invalid">
                        Author missing!
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control required as='textarea' rows={4} placeholder="Description" value={book.description} onChange={(e) => {setBook({...book, 'description': e.target.value})}}/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a description
                    </Form.Control.Feedback>
                </Form.Group>

                <Image src={bookImagePreview} style={{maxHeight: '100px'}} />

                <Form.Group className="mb-3" controlId="formBasicImage">
                    <Form.Label>Image</Form.Label>
                    <Form.Control required={!bookImagePreview ? true : false} type="file" placeholder="Image" src={bookImagePreview ? bookImagePreview : null} onChange={(e) => {setBook({...book, 'image': e.target.files[0]})}} />
                    {!bookImagePreview
                        ?  <Form.Control.Feedback type="invalid">
                            Please provide an image
                        </Form.Control.Feedback> : null}

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicGenre">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control required type="text" placeholder="Genre" defaultValue={book.genre} onChange={(e) => {setBook({...book, 'genre': e.target.value})}}/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a genre
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPages">
                    <Form.Label>Pages</Form.Label>
                    <Form.Control required type="text" placeholder="Pages" defaultValue={book.pages} onChange={(e) => {setBook({...book, 'pages': e.target.value})}}/>
                    <Form.Control.Feedback type="invalid">
                        Please provide pages count
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDate">
                    <Form.Label>Publication Date</Form.Label>
                    <Form.Control required type="date" placeholder="Publication Date" defaultValue={book.published_at} onChange={(e) => {setBook({...book, 'published_at': e.target.value})}}/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a publication date
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Is Available"
                                 defaultChecked={book ? book.is_available : false} onChange={(e) => {setBook({...book, 'is_available': e.target.checked})}}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBody">
                    <Form.Label>Body</Form.Label>
                    <Form.Control required as='textarea' rows={20} placeholder="Body" value={book.body} onChange={(e) => {setBook({...book, 'body': e.target.value})}} />
                    <Form.Control.Feedback type="invalid">
                        Please provide a body
                    </Form.Control.Feedback>
                </Form.Group>


                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Fragment>
    );
}

export default BookAddScreen;