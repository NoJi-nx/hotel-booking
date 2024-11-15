import React, { useState, useEffect } from 'react';
import HeroBanner from '../components/heroBanner';
import { Container, Row, Col } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import HotelCard from '../components/HotelCard';
import { Hotel } from '../assets/data/hotelInterface';
import SearchBar from '../components/SearchBar';

const SearchResultList: React.FC = () => {
  const location = useLocation();
  const [data, setData] = useState<Hotel[]>([]); 

  //  useEffect to update data when location.state changes
  useEffect(() => {
    if (location.state) {
      setData(location.state as Hotel[]); // update data when new search results are available
    }
  }, [location.state]);

  return (
    <>
      <HeroBanner title={"Hotel Search Results"} />

      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            {
              data.length === 0 ? (
                <h4 className='text-center'>No hotel found</h4>
              ) : (
                data.map((hotel: Hotel) => (
                  <Col lg="3" className="mb-4" key={hotel.id}>
                    <HotelCard hotel={hotel} />
                  </Col>
                ))
              )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SearchResultList;