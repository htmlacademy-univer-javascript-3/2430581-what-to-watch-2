import { ReviewsData } from '../../../../../types/reviews-data.ts';
import Review from '../review/review.tsx';

type ReviewColumnProps = {
  reviews: ReviewsData;
}
const ReviewColumn = ({reviews}: ReviewColumnProps):JSX.Element => (
  <div className="film-card__reviews-col">
    {
      reviews
        .map((item): JSX.Element => <Review key={item.id} review={item}/>)
    }
  </div>
);

export default ReviewColumn;
