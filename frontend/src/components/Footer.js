import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>Gain Webshop</Col>
        </Row>
        <Row>
          <Col className='text-center py-1'>info@gainwebshop.com</Col>
        </Row>
        <Row>
          <Col className='text-center py-1'>Copyright &copy; Webshop</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
