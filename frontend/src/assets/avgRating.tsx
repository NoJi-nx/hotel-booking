
interface Review {
    rating: number;
  }
  
  interface RatingResult {
    totalRating: number;
    avgRating: number | string;
  }
  

  const countAvgRating = (reviews: Review[]): RatingResult => {

    const totalRating = reviews?.reduce((acc: any,item: any) => acc + item.rating, 0)
    const avgRating = 
    totalRating === 0 
    ? '' 
    : totalRating === 1 
    ? totalRating 
    : (totalRating / reviews?.length).toFixed(1);



return {
    totalRating,
    avgRating
};
};

export default countAvgRating;