import React from 'react';
import { Container, Row, Col } from 'reactstrap';

// define the type for the props
interface HeroBannerProps {
  title: string;
}

// define the component with the props type
const HeroBanner: React.FC<HeroBannerProps> = ({ title }) => {
  return (
    <section className='hero__banner'>
      <Container>
        <Row>
          <Col>
            <h1>{title}</h1>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroBanner;
