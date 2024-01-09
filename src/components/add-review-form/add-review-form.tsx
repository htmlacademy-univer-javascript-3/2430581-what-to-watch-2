import { useState } from 'react';
import { APIRoute, AppRoute, FilmRoute } from '../../const/const.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../store';

type FormData = {
  name: string;
  value: string;
}
const AddReviewForm = (): JSX.Element => {
  const params = useParams();
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const onChangeHandler = ({name, value}: FormData) => {
    if (name === 'rating') {
      setRating(Number(value));
    } else {
      setReviewText(value);
    }
  };

  const sendComment = async () => {
    if (params.id === undefined) {
      throw 'id empty';
    }
    await api.post<Comment>(`${APIRoute.Comments}${params.id}`, {comment: reviewText, rating});
  };

  const handleSubmitClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    sendComment()
      .then(() => {
        if (params.id) {
          navigate(AppRoute.Film.replace(':id', params.id).replace(':info', FilmRoute.Reviews));
        } else {
          navigate(AppRoute.Main);
        }
      })
      .catch(() => {
        navigate(AppRoute.Main);
      });
  };

  return (
    <div className="add-review">
      <form
        action="#"
        className="add-review__form"
      >
        <div className="rating">
          <div className="rating__stars">
            <input
              className="rating__input"
              id="star-10"
              type="radio"
              name="rating"
              value="10"
              onChange={(evt) => onChangeHandler(evt.target)}
            />
            <label
              className="rating__label"
              htmlFor="star-10"
            >Rating 10
            </label>

            <input
              className="rating__input"
              id="star-9"
              type="radio"
              name="rating"
              value="9"
              onChange={(evt) => onChangeHandler(evt.target)}
            />
            <label
              className="rating__label"
              htmlFor="star-9"
            >Rating 9
            </label>

            <input
              className="rating__input"
              id="star-8"
              type="radio"
              name="rating"
              value="8"
              onChange={(evt) => onChangeHandler(evt.target)}
            />
            <label
              className="rating__label"
              htmlFor="star-8"
            >Rating 8
            </label>

            <input
              className="rating__input"
              id="star-7"
              type="radio"
              name="rating"
              value="7"
              onChange={(evt) => onChangeHandler(evt.target)}
            />
            <label
              className="rating__label"
              htmlFor="star-7"
            >Rating 7
            </label>

            <input
              className="rating__input"
              id="star-6"
              type="radio"
              name="rating"
              value="6"
              onChange={(evt) => onChangeHandler(evt.target)}
            />
            <label
              className="rating__label"
              htmlFor="star-6"
            >Rating 6
            </label>

            <input
              className="rating__input"
              id="star-5"
              type="radio"
              name="rating"
              value="5"
              onChange={(evt) => onChangeHandler(evt.target)}
            />
            <label
              className="rating__label"
              htmlFor="star-5"
            >Rating 5
            </label>

            <input
              className="rating__input"
              id="star-4"
              type="radio"
              name="rating"
              value="4"
              onChange={(evt) => onChangeHandler(evt.target)}
            />
            <label
              className="rating__label"
              htmlFor="star-4"
            >Rating 4
            </label>

            <input
              className="rating__input"
              id="star-3"
              type="radio"
              name="rating"
              value="3"
              onChange={(evt) => onChangeHandler(evt.target)}
            />
            <label
              className="rating__label"
              htmlFor="star-3"
            >Rating 3
            </label>

            <input
              className="rating__input"
              id="star-2"
              type="radio"
              name="rating"
              value="2"
              onChange={(evt) => onChangeHandler(evt.target)}
            />
            <label
              className="rating__label"
              htmlFor="star-2"
            >Rating 2
            </label>

            <input
              className="rating__input"
              id="star-1"
              type="radio"
              name="rating"
              value="1"
              onChange={(evt) => onChangeHandler(evt.target)}
            />
            <label
              className="rating__label"
              htmlFor="star-1"
            >Rating 1
            </label>
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            placeholder="Review text"
            onChange={(evt) => onChangeHandler(evt.target)}
          >
          </textarea>
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              onClick={handleSubmitClick}
            >Post
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AddReviewForm;
