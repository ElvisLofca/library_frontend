import React from 'react';
import {Container, Row, Col} from "react-bootstrap";

function Footer(props) {
    return (
        <Container>
            <Row>
                <Col className='text-center'>Copyright &copy; Library</Col>
            </Row>
        </Container>
    );
}

export default Footer;