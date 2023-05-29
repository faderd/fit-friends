import { AppRoute } from '../../../const';
import { Link, generatePath } from 'react-router-dom';
import { TrainingRdo } from '../../types/training-rdo';

type TrainingItemProps = {
  training: TrainingRdo;
  liClassName: string;
}

function TrainingItem({ training, liClassName }: TrainingItemProps): JSX.Element {
  return (
    <li className={liClassName}>
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <source type="image/webp"
                srcSet={`${training.backgroundImage}.webp, ${training.backgroundImage}@2x.webp 2x`} /><img
                src={`${training.backgroundImage}.jpg`}
                srcSet={`${training.backgroundImage}@2x.jpg 2x`} width="330" height="190" alt="" />
            </picture>
          </div>
          <p className="thumbnail-training__price">{training.price === 0 ? 'Бесплатно' : training.price}
          </p>
          <h3 className="thumbnail-training__title">{training.name}</h3>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>#{training.type.toLowerCase()}</span></div>
              </li>
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>#{training.calories}ккал</span></div>
              </li>
            </ul>
            <div className="thumbnail-training__rate">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg><span className="thumbnail-training__rate-value">{training.rate}</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">{training.description}</p>
          </div>
          <div className="thumbnail-training__button-wrapper">
            <Link className="btn btn--small thumbnail-training__button-catalog" to={generatePath(AppRoute.TrainingCard, {id: training.id?.toString() || ''})}>Подробнее</Link>
            <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
          </div>
        </div>
      </div>
    </li>
  );
}

export default TrainingItem;
