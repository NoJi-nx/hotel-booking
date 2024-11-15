import React, {useState, useEffect}from 'react';
import HeroBanner from '../components/heroBanner'; 
import HotelCard from '../components/HotelCard';
import SearchBar from '../components/SearchBar';
import Newsletter from '../components/NewsLetter';
import { Container, Row, Col } from 'reactstrap';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import { Hotel } from '../assets/data/hotelInterface';  // Assuming Hotel interface is defined here




const Hotels: React.FC = () => {

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

   const {data:hotels, loading, error} = useFetch<Hotel[]>(`${BASE_URL}/hotels?page=${page+1}&limit=8`)
   const {data:hotelCount} = useFetch<number>(`${BASE_URL}/hotels/search/getHotelCount`)
 
   
  useEffect(() => {
    if (hotelCount !== null && hotelCount !== undefined) { // Check if hotelCount is not null or undefined
      const pages = Math.ceil(hotelCount / 8);
      setPageCount(pages);
      window.scrollTo(0,0)
    }
  }, [page, hotelCount, hotels]);

  
  return (
    <>
      <HeroBanner title={"All Hotels"} /> 

      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          {loading && <h4 className="pt-5 text-center">Loading.....</h4>}
          {error && <h4 className="pt-5 text-center">{error}</h4>}
          {
            !loading && !error && <Row>
            {
              hotels?.map(hotel => (
                <Col lg="3" md="6" sm="6" className='mb-4' key={hotel.id}>
                  
                  <HotelCard hotel={hotel} />
                </Col>
                
              ))}
              

              <Col lg="12">
              <div className="gap-3 mt-4 pagination d-flex align-items-center justify-content-center">
                {Array.from({ length: pageCount }, (_, number) => (
                  <span key={number} 
                  onClick={() => setPage(number)}
                  className={page === number ? "active__page" : ""}
                  >
                    {number + 1}
                  </span>
                ))}
              </div>
              </Col>
          </Row>
          }
        </Container>
      </section>
      <Newsletter />
    </>
  );
}



export default Hotels;
