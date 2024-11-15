import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import heroImg1 from './assets/img/heroImg1.jpg';
import heroImg2 from './assets/img/heroImg2.jpg';
import heroImg3 from './assets/img/heroImg3.jpg';
import iconImg from './assets/logos/icon.png';
import experienceImg from './assets/img/experiences.png'
import Subtitle from './assets/Subtitle';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ServiceList from './components/ServiceList';
import SearchBar from './components/SearchBar';
import FeaturedHotelList from './components/FeaturedHotelList';
import FansComp from './components/FansComp';
import Newsletter from './components/NewsLetter';
import Hotels from './pages/Hotels';
import HotelDetails from './pages/HotelDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchResultList from './pages/ResultList';
import BookingDone from './pages/BookingDone';


function App() {
  return (
    <Router>
      <div className="App">
       <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/hotels/search" element={<SearchResultList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/booking-done" element={<BookingDone/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

function NotFound() {
  return (
    <section className="">
      <h1>404 - Page Not Found</h1>
    </section>
  );
}

function Home() {
  return (
    <>
      <section className="flex justify-center bg-neutral-950">
        <Container>
          <Row>
            <Col>
            <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={'Enjoy your stay'}/> 
                  <img src={iconImg} alt="" />
                </div>
                <h1>Traveling opens the door to creating <span className="highlight"> memories</span></h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Aspernatur unde vitae provident inventore quidem rem eveniet dolorem expedita, esse molestias mollitia minus. 
                  Blanditiis dicta aperiam, aliquam veniam enim ullam repellendus.</p>
              </div>
            </Col>

            <Col lg='2'>
              <div className="mt-4 hero__img-box">
                <img src={heroImg1} alt="" />
              </div>
            </Col>
            <Col lg='2'>
              <div className="mt-4 hero__img-box">
                <img src={heroImg2} alt="" />
              </div>
            </Col>
            <Col lg='2'>
              <div className="mt-4 hero__img-box">
                <img src={heroImg3} alt="" />
              </div>
            </Col>
            <SearchBar />
          </Row>
        </Container>
        </section>

        <section>
          <Container>
            <Row>
              <Col lg='3'>
                <h5 className="services__text">Our services</h5>
                <h2 className='services__title'>We offer our best services</h2>
              </Col>
              <ServiceList />
            </Row>
          </Container>
        </section>

        <section>
          <Container>
            <Row>
            <Col lg='12' className='mb-5'>
              
              <Subtitle subtitle={'Explore'} /> 
              
              
              <h2 className='featured__hotel-title'>Our featured hotels</h2>
            </Col>
            <FeaturedHotelList />
            </Row>
          </Container>
        </section>

        {/*experience */}

        <section>
          <Container>
            <Row>
              <Col lg='6'>
              <div className="experience__content">
                <Subtitle subtitle={'Experience'}
                
                
                />
                <h2>With our experience <br /> we will provide <span className='highlight'>You</span> </h2>
                <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit
                <br />
                Aspernatur unde vitae provident inventore quidem rem
                </p>
              </div>
              <div className="gap-5 counter__wrapper d-flex align-items-center">
                <div className="counter__box">
                <span>12k+</span>
                <h6>Successful Bookings</h6>
              </div>
              <div className="counter__box">
                <span>2k+</span>
                <h6>Regular clients</h6>
              </div>
              <div className="counter__box">
                <span>15</span>
                <h6>Years experience</h6>
              </div>
              </div>
              </Col>
              <Col lg='6'>
              <div className="experience__img">
                <img src={experienceImg} alt="" />
              </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section>
  <Container>
    <Row>
      <Col lg='12'>
        <Subtitle subtitle={'Fans love'} />
        <h2 className='fans-comp__title'>What they say about us</h2>
      </Col>
      <Col lg='12'>
        <FansComp />
      </Col>
    </Row>
  </Container>
</section>
<Newsletter />

        </>
        
        
        );
}
export default App;
