import React, { useRef } from 'react';
import { Col, Form, FormGroup } from "reactstrap";
import { BASE_URL } from './../utils/config';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const maxRoomRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const searchHandler = async (event: React.FormEvent) => {
    event.preventDefault(); 
  
    if (nameRef.current && locationRef.current && maxRoomRef.current) {
      const name = nameRef.current.value;
      const location = locationRef.current.value;
      const maxRoom = maxRoomRef.current.value;
  
      if (name === '' || location === '' || maxRoom === '') {
        return alert('All fields must be entered!');
      }
  
      const res = await fetch(
        `${BASE_URL}/hotels/search/getHotelBySearch?title=${name}&city=${location}&maxRoom=${maxRoom}`
      );
  
      if (!res.ok) return alert('Something went wrong');
  
      const result = await res.json();
  
      console.log('Search Result:', result.data);  // Log the result to inspect the structure
  
      navigate(
        `/hotels/search?title=${name}&city=${location}&maxRoom=${maxRoom}`,
        {
          state: result.data
        }
        
      );

      console.log("Search Result Data:", result.data);
  
      console.log({ name, location, maxRoom });
    }
  };

  return (
    <Col lg='12'>
      <div className="search__bar">
        <Form className="gap-4 d-flex align-items-center" onSubmit={searchHandler}>
          <FormGroup className='gap-3 d-flex form__group form__group-fast'>
            <span><i className="ri-map-pin-line"></i></span>
            <div>
              <h6>Name</h6>
              <input type="text" placeholder="Enter..." ref={nameRef} />
            </div>
          </FormGroup>
          <FormGroup className='gap-3 d-flex form__group form__group-fast'>
            <span><i className="ri-map-pin-time-line"></i></span>
            <div>
              <h6>Location</h6>
              <input type="text" placeholder="Enter.." ref={locationRef} />
            </div>
          </FormGroup>
          <FormGroup className='gap-3 d-flex form__group form__group-fast'>
            <span><i className="ri-hotel-bed-line"></i></span>
            <div>
              <h6>Rooms</h6>
              <input type="number" placeholder="0" ref={maxRoomRef} />
            </div>
          </FormGroup>
          <button className='search__icon' type='submit'>
            <i className="ri-search-line"></i>
          </button>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;