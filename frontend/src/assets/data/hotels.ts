import hotelImg1 from "../hotel-imgs/hotelImg1.png";
import hotelImg2 from "../hotel-imgs/hotelImg2.png";
import hotelImg3 from "../hotel-imgs/hotelImg3.png";
import hotelImg4 from "../hotel-imgs/hotelImg4.png";
import hotelImg5 from "../hotel-imgs/hotelImg5.png";
import hotelImg6 from "../hotel-imgs/hotelImg6.png";
import hotelImg7 from "../hotel-imgs/hotelImg7.png";
import hotelImg8 from "../hotel-imgs/hotelImg8.png";


import { Hotel } from "./hotelInterface";

const hotels = [
  {
    id: "01",
    title: "St Giles London, UK",
    city: "London",
    address: "Bedford Avenue, Camden",
    price: 99,
    maxRoom: 8,
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: hotelImg1,
    featured: true,
  },
  {
    id: "02",
    title: "Clarion Hotel, Sweden",
    city: "Stockholm",
    address: "Ringvägen 98",
    price: 99,
    maxRoom: 8,
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: hotelImg2,
    featured: true,
  },
  {
    id: "03",
    title: "Hotel Anya, France",
    city: "Paris",
    address: "11:e arr. - Bastille - République",
    price: 99,
    maxRoom: 8,
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
      {
        name: "jhon doe2",
        rating: 5,
      },
    ],
    avgRating: 4.5,
    photo: hotelImg3,
    featured: true,
  },
  {
    id: "04",
    title: "Hotel Traiano, Italy",
    city: "Rome",
    address: "Via Quattro Novembre 154, Rione Monti,",
    price: 99,
    maxRoom: 8,
    desc: "this is the description",
    reviews: [
      {
        name: "jhon doe",
        rating: 4.6,
      },
    ],
    avgRating: 4.5,
    photo: hotelImg4,
    featured: true,
  },
  {
    id: "05",
    title: "Lumbung Seraya Villa, Indonesia",
    city: "Bali",
    address: "Jalan Subak lebah",
    price: 99,
    maxRoom: 8,
    desc: "this is the description",
    reviews: [
      
    ],
    avgRating: 4.5,
    photo: hotelImg5,
    featured: false,
  },
  {
    id: "06",
    title: "Tokyo Asakusa Kuramae, Japan",
    city: "Tokyo",
    address: "85 Saint Georges Mall,",
    price: 99,
    maxRoom: 8,
    desc: "this is the description",
    reviews: [
    
    ],
    avgRating: 4.5,
    photo: hotelImg6,
    featured: false,
  },
  {
    id: "07",
    title: "Old Bank Hotel, South Africa",
    city: "Cape Town",
    address: "Somewhere in France",
    price: 99,
    maxRoom: 8,
    desc: "this is the description",
    reviews: [
     
    ],
    avgRating: 4.5,
    photo: hotelImg7,
    featured: false,
  },
  {
    id: "08",
    title: "Cadillac Hotel Boutique, Mexico",
    city: "Mexico City",
    address: "José María Izazaga 35",
    price: 99,
    maxRoom: 8,
    desc: "this is the description",
    reviews: [

    ],
    avgRating: 4.5,
    photo: hotelImg8,
    featured: false,
  },
  
];

export default hotels;
