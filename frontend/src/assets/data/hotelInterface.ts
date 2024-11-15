export interface Review{
  id: string;
  username: string;
  reviewText: string;
  rating: number;
  createdAt: string; 
}

  
  export interface Hotel {
    id: string;
    title: string;
    city: string;
    address: string;  
    price: number;
    maxRoom: number;
    desc: string;
    reviews: Review[];
    avgRating: number;
    photo: string;
    featured: boolean;
  }