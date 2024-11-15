import React from 'react'
import ServiceCards from './ServiceCards';
import { Col } from "reactstrap";
import hotelImg from "../assets/img/hotelIcon.png"
import serviceImg from "../assets/img/serviceIcon.png"
import customImg from "../assets/img/customization.png"

const servicesData = [
    {
        imgUrl: hotelImg,
        title: "Hotels",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
    },
    {
        imgUrl: serviceImg,
        title: "Service",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
    },
    {
        imgUrl: customImg,
        title: "Customization",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit"
    }
]

const ServiceList = () => {
  return <> 
      {
          servicesData.map((item,index)=> 
          <Col lg='3' md="6" sm="12" className='mb-4' key={index}>
              <ServiceCards item={item} />

          </Col>)
      }
    </>
  
}

export default ServiceList
