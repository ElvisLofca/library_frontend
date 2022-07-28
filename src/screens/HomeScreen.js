import React from 'react';
import {Form, InputGroup, Button, Carousel} from "react-bootstrap";

function HomeScreen(props) {
    return (
        <Carousel >
            <Carousel.Item >
                <img
                    className="d-block w-100"
                    src="https://wallpaperaccess.com/full/922671.jpg"
                    alt="First slide"
                    style={{height: '50vh', objectFit: 'cover'}}
                />
                <Carousel.Caption>
                    <h3>Welcome to the library</h3>
                    <p>Here you can find many books!</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://www.feduraluniversity.com/wp-content/uploads/2021/03/photo-1507842217343-583bb7270b66.jpeg"
                    alt="Second slide"
                    style={{height: '50vh', objectFit: 'cover'}}
                />

                <Carousel.Caption>
                    <h3>This library is going to be always with you</h3>
                    <p>Take as much time as you need to find the perfect book!</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://lp-cms-production.imgix.net/2020-11/GettyImages-140118354.jpg?auto=format&q=40&ar=16%3A9&fit=crop"
                    alt="Third slide"
                    style={{height: '50vh', objectFit: 'cover'}}
                />

                <Carousel.Caption>
                    <h3>Found the book?</h3>
                    <p>
                        Don't waste more time! Start reading.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default HomeScreen;