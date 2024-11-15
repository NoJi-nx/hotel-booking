import React from 'react'
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";

const BookingDone= () => {
  return (
   <section>
     <Container>
       <Row>
         <Col lg="12">
           <div className='booking__done'>
             <span><i className="ri-checkbox-circle-line"></i></span>
             <h1 className="mb-3 fw-semibold">Thank You!</h1>
             <h3 className="mb-4">Your reservation is booked.</h3>

             <Button className='btn primary__btn w-25'><Link to='/home'>Return to homepage</Link></Button>
           </div>
         </Col>
       </Row>
     </Container>
   </section>
  )
}

export default BookingDone;
