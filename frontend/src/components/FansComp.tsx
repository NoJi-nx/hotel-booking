import React from 'react'
import Slider from 'react-slick';
import crmImg1 from '../assets/img/crm1.jpg';
import crmImg2 from '../assets/img/crm2.jpg';
import crmImg3 from '../assets/img/crm3.jpg';
import crmImg4 from '../assets/img/crm4.jpg';
import crmImg5 from '../assets/img/crm5.jpg';

const FansComp = () => {

  const settings= {
    dots:true,
    infinite:true,
    autoplay:true,
    speed:1000,
    swipeToSlide:true,
    autoplaySpeed:2000,
    slidesToShow:3,

    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            },
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow:1,
                slidesToScroll: 1,
            }
        }
    ]
}
  return (
    <Slider {...settings}>
      <div className="fans-comp py-4 px-3">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Aspernatur unde vitae provident inventore quidem rem eveniet dolorem expedita, 
              esse molestias mollitia minus. Blanditiis dicta aperiam, aliquam veniam enim ullam repellendus
              </p>
              <div className="d-flex align-items-center gap-4 mt-3">
                  <img src={crmImg1} className='w-25 h-25 rounded-2' alt="" />
        <div>
      <h6 className="mb-0 mt-3">John Doe</h6>
      <p>Customer</p>
      </div>
  </div>
  </div>

  <div className="fans-comp py-4 px-3">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Aspernatur unde vitae provident inventore quidem rem eveniet dolorem expedita, 
              esse molestias mollitia minus. Blanditiis dicta aperiam, aliquam veniam enim ullam repellendus
              </p>
              <div className="d-flex align-items-center gap-4 mt-3">
                  <img src={crmImg4} className='w-25 h-25 rounded-2' alt="" />
        <div>
      <h6 className="mb-0 mt-3">Lia Franklin</h6>
      <p>Customer</p>
      </div>
  </div>
  </div>

  <div className="fans-comp py-4 px-3">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Aspernatur unde vitae provident inventore quidem rem eveniet dolorem expedita, 
              esse molestias mollitia minus. Blanditiis dicta aperiam, aliquam veniam enim ullam repellendus
              </p>
              <div className="d-flex align-items-center gap-4 mt-3">
                  <img src={crmImg2} className='w-25 h-25 rounded-2' alt="" />
        <div>
      <h6 className="mb-0 mt-3">John Doe</h6>
      <p>Customer</p>
      </div>
  </div>
  </div>

  <div className="fans-comp py-4 px-3">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Aspernatur unde vitae provident inventore quidem rem eveniet dolorem expedita, 
              esse molestias mollitia minus. Blanditiis dicta aperiam, aliquam veniam enim ullam repellendus
              </p>
              <div className="d-flex align-items-center gap-4 mt-3">
                  <img src={crmImg3} className='w-25 h-25 rounded-2' alt="" />
        <div>
      <h6 className="mb-0 mt-3">John Doe</h6>
      <p>Customer</p>
      </div>
  </div>
  </div>

  <div className="fans-comp py-4 px-3">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Aspernatur unde vitae provident inventore quidem rem eveniet dolorem expedita, 
              esse molestias mollitia minus. Blanditiis dicta aperiam, aliquam veniam enim ullam repellendus
              </p>
              <div className="d-flex align-items-center gap-4 mt-3">
                  <img src={crmImg5} className='w-25 h-25 rounded-2' alt="" />
        <div>
      <h6 className="mb-0 mt-3">John Doe</h6>
      <p>Customer</p>
      </div>
  </div>
  </div>
    </Slider>
  )
}

export default FansComp;
