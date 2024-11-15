import React, {useContext, useState} from 'react';
import { Hotel } from '../assets/data/hotelInterface';
import {Form, FormGroup, ListGroup, ListGroupItem, Button} from "reactstrap";
import { useNavigate } from "react-router-dom";

import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

interface BookingProps {
  hotel: Hotel;
  avgRating: number; 
}

const Booking: React.FC<BookingProps> = ({ hotel, avgRating }) => {
  const { price, reviews, title } = hotel;
  const navigate = useNavigate();

  const { state } = useContext(AuthContext); // access state from AuthContext
  const { user } = state; // extract user from state
  
  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    hotelName: title,
    fullName:"",
    phone:'',
    guestSize: 1,
    bookAt:''
  })

  const getToken = () => {
    // Check cookies first
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find(cookie => cookie.startsWith('accessToken='));
    if (tokenCookie) {
        return tokenCookie.split('=')[1];
    }
    
    // If not found in cookies, check local storage
    const localStorageToken = localStorage.getItem('accessToken');
    if (localStorageToken) {
        return localStorageToken;
    }

    return null;  // If token not found in both
};
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBooking(prev => ({ ...prev, [e.target.id]: e.target.value}));
  };

  const serviceFee = 10
  const totalAmount = Number(price) * Number(booking.guestSize) 
  + Number (serviceFee)
  // send data
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', booking);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
        const token = getToken();
        if (!token) {
            return alert('No token found, please login again.');
        }

        console.log("Token being sent:", token);

        const res = await fetch(`${BASE_URL}/booking`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Ensure Bearer token is set correctly
    },
    credentials: 'include',
    body: JSON.stringify(booking),
});

        const result = await res.json();

        if (!res.ok) {
            return alert(result.message);
        }
        navigate("/booking-done");
        console.log(booking);

    } catch (err) {
        let errorMessage = 'An unknown error occurred';
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        console.error(errorMessage);
    }
    
};

  return (
    <div className='booking'>
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>${price} <span>/per person</span></h3>
        <span className="hotel__rating d-flex align-items-center">
              <i className="ri-star-fill"></i> 
                {avgRating === 0 ? null : avgRating} ({reviews?.length})
            
              </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleSubmit}>
          <FormGroup>
            <input 
            type="text" 
            placeholder='Full Name' 
            id="fullName"
            required onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <input 
            type="number" 
            placeholder='Phone' 
            id="phone" 
            required onChange={handleChange}/>
             <FormGroup className='gap-3 d-flex align-items-center'>
               <input 
               type="date" 
               placeholder='Date' 
               id='bookAt'
               required onChange={handleChange} />
               <input 
               type="number" 
               placeholder='Members' 
               id="guestSize"
               required onChange={handleChange} />
             </FormGroup>
          </FormGroup>
        </Form>
      </div>
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="px-0 border-0">
            <h5 className='gap-1 d-flex align-items-center'>
              ${price} <i className="ri-close-line"></i>1 person 
              </h5>
            <span>${price}</span>
          </ListGroupItem>
          <ListGroupItem className="px-0 border-0">
            <h5>Service charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="px-0 border-0 total">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className='mt-4 btn primary__btn w-100' onClick={handleClick}>Book Now</Button>
      </div>
    </div>
  );
};

export default Booking;
