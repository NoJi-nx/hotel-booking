import React from 'react';
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { Hotel } from '../assets/data/hotelInterface';
import countAvgRating from '../assets/avgRating';

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

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const { id, title, city, photo, price, featured, reviews } = hotel;
  const { totalRating, avgRating } = countAvgRating(reviews);

  
  const imageSrc = imageMap[photo]

  return (
    <div className="hotel-card">
      <Card>
        <div className="hotel__img">
          <img src={imageSrc} alt="hotel-img" />
          {featured && <span>Featured</span>}
        </div>
        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="gap-1 hotel__location d-flex align-items center">
              <i className="ri-map-pin-line"></i> {city}
            </span>
            <span className="gap-1 hotel__rating d-flex align-items center">
              <i className="ri-star-fill"></i> {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? 'Not rated' : <span>({reviews.length})</span>}
            </span>
          </div>
          <h5 className="hotel__title">
            <Link to={`/hotels/${id}`}>{title}</Link>
          </h5>
          <div className="mt-3 card__bottom d-flex align-items-center justify-content-between">
            <h5>${price} <span> / night</span></h5>
            <button className="btn booking__btn">
              <Link to={`/hotels/${id}`}>Book now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default HotelCard;