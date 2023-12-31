import { ReviewData } from '../../../../../types';

type ReviewProps = {
  review: ReviewData;
}
const Review = ({review}: ReviewProps) => {
  const formatDate = (date: string): string =>
    new Date(date)
      .toLocaleDateString('ru-RU')
      .split('.')
      .reverse()
      .join('-');
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>
        <footer className="review__details">
          <cite className="review__author">{review.user}</cite>
          <time className="review__date" dateTime={formatDate(review.date)}>{review.date}</time>
        </footer>
      </blockquote>
      <div className="review__rating">{review.rating}</div>
    </div>
  );
};

export default Review;
