import React from 'react';
import HotelCard from './HotelCard';
import { Col } from 'reactstrap';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import { Hotel } from '../assets/data/hotelInterface';

const FeaturedHotelList: React.FC = () => {
  const { data: featuredHotels, error, loading } = useFetch<Hotel[]>(`${BASE_URL}/hotels/search/getFeaturedHotel`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    {
      loading && <h4>Loading........</h4>
    }
    {
      error && <h4>{error}</h4>
    }
      {!loading && !error && featuredHotels?.map((hotel: Hotel) => (
        <Col lg="3" md='6' sm='6' className='mb-4' key={hotel.id}>
          <HotelCard hotel={hotel} />
        </Col>
      ))}
    </>
  );
};

export default FeaturedHotelList;