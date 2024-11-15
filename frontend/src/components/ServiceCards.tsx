import React from 'react'



interface ServiceItem {
    imgUrl: string;
    title: string;
    desc: string;
  }

  const ServiceCards: React.FC<{ item: ServiceItem }> = ({ item }) => {



    const {imgUrl , title, desc} = item


  return (
  <div className='service__item'>
        <div className="service__img">
            <img src={imgUrl} alt="" />

        </div>
      <h5>{title}</h5>
      <p>{desc}</p>
    </div>
  )
}

export default ServiceCards
