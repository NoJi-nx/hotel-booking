import React, {useContext, useEffect, useRef, useState} from 'react';
import {Container, Row, Col, Form, ListGroup} from "reactstrap";
import {useParams} from 'react-router-dom';
import { Hotel } from '../assets/data/hotelInterface';
import countAvgRating from './../assets/avgRating';
import avatarImg from '../assets/img/clarity_avatar-solid.png';
import Booking from '../components/Booking';
import Newsletter from '../components/NewsLetter';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';

import { AuthContext } from '../context/AuthContext';

import hotelImg1 from '../assets/hotel-imgs/hotelImg1.png';
import hotelImg2 from '../assets/hotel-imgs/hotelImg2.png';
import hotelImg3 from '../assets/hotel-imgs/hotelImg3.png';
import hotelImg4 from '../assets/hotel-imgs/hotelImg4.png';
import hotelImg5 from '../assets/hotel-imgs/hotelImg5.png';
import hotelImg6 from '../assets/hotel-imgs/hotelImg6.png';
import hotelImg7 from '../assets/hotel-imgs/hotelImg7.png';
import hotelImg8 from '../assets/hotel-imgs/hotelImg8.png';
import hotelImg9 from '../assets/hotel-imgs/hotelImg9.png';

// map filenames to imported images
const imageMap: { [key: string]: string } = {
  "hotelImg1.png": hotelImg1,
  "hotelImg2.png": hotelImg2,
  "hotelImg3.png": hotelImg3,
  "hotelImg4.png": hotelImg4,
  "hotelImg5.png": hotelImg5,
  "hotelImg6.png": hotelImg6,
  "hotelImg7.png": hotelImg7,
  "hotelImg8.png": hotelImg8,
  "hotelImg9.png": hotelImg9,
};

const HotelDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const reviewMsgRef = useRef<HTMLInputElement>(null);
  const [hotelRating, setHotelRating] = useState<number | null>(null);
  const { state } = useContext(AuthContext)
  const { user } = state;

  
  const { data: hotel, loading, error } = useFetch<Hotel>(`${BASE_URL}/hotels/${id}`);

  useEffect(() => {
    window.scrollTo(0,0);
  }, [hotel])

 
  // If still loading, display a loading message
  if (loading) {
    return <h4 className="pt-5 text-center">Loading.....</h4>;
  }

  // If  error, display the error message
  if (error) {
    return <h4 className="pt-5 text-center">{error}</h4>;
  }

  // If hotel is not found, display not found message
  if (!hotel) {
    return <div>Hotel not found</div>;
  }
  
  // Properties from hotel object
  const {photo, title, address, desc, price, reviews, city, maxRoom} = hotel;

  const {totalRating, avgRating} = countAvgRating(reviews)

  const imageSrc = imageMap[photo]

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current?.value || '';

    console.log('Review message:', reviewText);
    console.log('Hotel rating:', hotelRating);

    const token = localStorage.getItem('userToken');
    console.log("Token being sent:", token);

    if (!token) {
        return alert('You need to be logged in to submit a review.');
    }

    try {
        const reviewObj = {
            userId: user?._id,  // Include userId in the review object
            username: user?.username,
            reviewText,
            rating: hotelRating
        }

        const res = await fetch(`${BASE_URL}/review/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
            body: JSON.stringify(reviewObj)
        })

        const result = await res.json();

        if (!res.ok) {
            return alert(result.message);
        }

        alert(result.message);
    } catch (err) {
        if (err instanceof Error) {
            alert(err.message);
        } else {
            alert('An unknown error occurred.');
        }
    }
};
  
  
  return (
  <>
    <section>
      <Container>
        {
          loading && <h4 className='pt-5 text-center'>Loading.......</h4>
        }
        {
          loading && <h4 className='pt-5 text-center'>{error}</h4>
        }
        {
          !loading && !error && (

          <Row>
          <Col lg='8'>
            <div className="hotel__photo">
              <img src={imageSrc} alt="" />

              <div className="hotel__details">
                <h2>{title}</h2>
                <div className='gap-5 d-flex align-items-center'>
                  
                <span className="gap-1 hotel__rating d-flex align-items-center">
              <i className="ri-star-fill" 
              style={{'color': "var(--secondary-color"}}>
                </i> 
                {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? ( 
                  'Not rated' 
                  ) : ( 
                  <span>({reviews.length})</span> 
                  )}
              </span>

                  <span>
                  <i className="ri-map-pin-fill"></i> {address}
                    </span>
                  </div>

                  <div className="hotel__extra-details">
                    <span><i className="ri-map-pin-line"></i>{city}</span>
                    <span><i className="ri-money-dollar-circle-fill"> ${price} /per person</i></span>
                    <span><i className="ri-hotel-bed-line">{maxRoom} Rooms Available</i></span>
                  </div>
                  <h5>Description</h5>
                  <p>{desc}</p>
              </div>

              {/*Reviews */}
              <div className='mt-4 hotel__reviews'>
                <h4>Reviews ({reviews?.length} reviews)</h4>

                <Form onSubmit={submitHandler}>
                  <div className="gap-3 mb-4 d-flex align-items-center rating__group">
                    <span onClick={()=> setHotelRating(1)}>
                     1 <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={()=> setHotelRating(2)}>
                     2 <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={()=> setHotelRating(3)}>
                    3 <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={()=> setHotelRating(4)}>
                    4 <i className="ri-star-s-fill"></i>
                    </span>
                    <span onClick={()=> setHotelRating(5)}>
                    5 <i className="ri-star-s-fill"></i>
                    </span>
                  </div>

                  <div className="review__input">
                    <input type="text" ref={reviewMsgRef} placeholder='Leave a comment' required/>
                    <button className='text-white btn primary__btn' type="submit">Submit</button>
                  </div>
                </Form>
                <ListGroup className='user__reviews'>
                  {
                    reviews?.map(review => (
                      <div className="review__item">
                        <img src={avatarImg} alt="" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.username}</h5>
                              <p>
                                {new Date(
                                  review.createdAt
                                  ).toLocaleDateString("en-GB", options
                                )}
                              </p>
                            </div>
                            <span className="review_number d-flex align-items-center">
                            {review.rating} <i className="ri-star-s-fill"></i>
                            </span>
                          </div>
                          <h6>{review.reviewText}</h6>
                        </div>
                      </div>
                    ))
                  }
                </ListGroup>
              </div>
              {/*Reviews */}

            </div>
          </Col>
         
          <Col lg='4'>
          <Booking hotel={hotel} avgRating={avgRating as number} />
          </Col>
        </Row>
          )
        }
       
      </Container>
    </section>
    <Newsletter />
  </>
  )
}

export default HotelDetails;
