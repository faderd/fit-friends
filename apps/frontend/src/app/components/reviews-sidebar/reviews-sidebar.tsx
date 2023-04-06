import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviews } from '../../store/api-actions';
import { getReviews } from '../../store/app-data/selectors';

type ReviewsSidebarProps = {
  trainingId: number;
}

function ReviewsSidebar({ trainingId }: ReviewsSidebarProps): JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getReviews);

  useEffect(() => {
    dispatch(fetchReviews(trainingId));
  }, [dispatch, trainingId]);

  return (
    <ul className="reviews-side-bar__list">
      {
        reviews.map((review) => (
          <li className="reviews-side-bar__item">
            <div className="review">
              <div className="review__user-info">
                <div className="review__user-photo">
                  <picture>
                    <source type="image/webp" srcSet="img/content/avatars/users//photo-1.webp, img/content/avatars/users//photo-1@2x.webp 2x" /><img src="img/content/avatars/users//photo-1.png" srcSet="img/content/avatars/users//photo-1@2x.png 2x" width="64" height="64" alt="Изображение пользователя" />
                  </picture>
                </div><span className="review__user-name">{review.author?.name}</span>
                <div className="review__rating">
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-star"></use>
                  </svg><span>{review.rate}</span>
                </div>
              </div>
              <p className="review__comment">{review.text}</p>
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default ReviewsSidebar;
