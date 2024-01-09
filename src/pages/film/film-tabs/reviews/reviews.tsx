import { ReviewsData } from '../../../../types';
import ReviewColumn from './review-column/review-column.tsx';

type ReviewsProps = {
  reviews: ReviewsData;
};
const Reviews = ({reviews}: ReviewsProps): JSX.Element => (
  <div className="film-card__reviews film-card__row">
    <ReviewColumn reviews={reviews.slice(0, Math.floor(reviews.length / 2))}/>
    <ReviewColumn reviews={reviews.slice(3, Math.ceil(reviews.length / 2))}/>
  </div>
);

export default Reviews;
