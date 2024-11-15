import React from 'react'
import  { Container, Row, Col } from 'reactstrap';
import newsImg from '../assets/img/newsletter.png'

const Newsletter = () => {
  return (
      <section className='newsletter'>
          <Container>
              <Row>
                  <Col lg='6'>
                      <div className="newsletter__content">
                          <h2>Subscribe now to get useful information</h2>
                          <div className="newsletter__input">
                              <input type="email" placeholder='Enter your email' />
                              <button className='btn newsletter__btn'>Subscribe</button>
                          </div>

                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Aspernatur unde vitae provident inventore quidem rem eveniet dolorem expedita</p>
                      </div>
                  </Col>
                  <Col lg="6">
                      <div className="newsletter__img">
                          <img src={newsImg} alt="" />
                      </div>
                  </Col>
              </Row>
          </Container>
      </section>
  )
}

export default Newsletter