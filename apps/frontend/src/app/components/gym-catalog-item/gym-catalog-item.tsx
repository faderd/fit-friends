import { GymInterface } from '@fit-friends/shared-types';
import { Link, generatePath } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavoriteGyms } from '../../store/user-process/selectors';
import { updateUser } from '../../store/api-actions';
import { AppRoute } from '../../../const';

type GymCatalogItemProps = {
  gym: GymInterface;
  itemClassName: string;
}

function GymCatalogItem({ gym, itemClassName }: GymCatalogItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteGyms = useAppSelector(getFavoriteGyms);
  const getIsFavoriteGym = (gymId: number) => favoriteGyms?.includes(gymId);

  const handleFavoriteGymClick = (gymId: number) => {
    const newFavoriteGyms = favoriteGyms ? [...favoriteGyms] : [];

    if (getIsFavoriteGym(gymId)) {
      const gymIndex = newFavoriteGyms.findIndex((item) => item === gymId);
      newFavoriteGyms.splice(gymIndex, 1);
    } else {
      newFavoriteGyms.push(gymId);
    }

    dispatch(updateUser({ myFavoriteGyms: newFavoriteGyms }));
  };

  return (
    <li key={gym.id} className={itemClassName}>
      <div className="thumbnail-gym">
        <div className="thumbnail-gym__image">
          <picture>
            <source type="image/webp" srcSet="img/content/thumbnails/gym-01.webp, img/content/thumbnails/gym-01@2x.webp 2x" /><img src="img/content/thumbnails/gym-01.jpg" srcSet="img/content/thumbnails/gym-01@2x.jpg 2x" width="330" height="190" alt="" />
          </picture>
        </div>
        {gym.isVerified && (<div className="thumbnail-gym__verified">
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-verify"></use>
          </svg>
        </div>)}
        <button className={`thumbnail-gym__favourite-button ${gym.id && getIsFavoriteGym(gym.id) ? 'is-active' : ''}`}
          onClick={() => {
            if (!gym.id) { return; }
            handleFavoriteGymClick(gym.id);
          }}
        >
          {gym.id && !getIsFavoriteGym(gym.id) && (
            <>
              <span className="visually-hidden">Добавить в Избранное</span>
              <svg width="14" height="13" aria-hidden="true">
                <use xlinkHref="#icon-heart"></use>
              </svg>
            </>
          )}
          {gym.id && getIsFavoriteGym(gym.id) && (
            <>
              <span className="visually-hidden">Удалить из Избранного</span>
              <svg width="12" height="11" aria-hidden="true">
                <use xlinkHref="#icon-heart-filled"></use>
              </svg>
            </>
          )}
        </button>
        <div className="thumbnail-gym__header">
          <h4 className="thumbnail-gym__title">{gym.name}</h4>
          <div className="thumbnail-gym__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-gym__location-address">м. {gym.location}</address>
          </div>
        </div>
        <div className="thumbnail-gym__text-wrapper">
          <p className="thumbnail-gym__text">{gym.description}</p>
        </div>
        <div className="thumbnail-gym__buttons-wrapper">
          <Link className="btn btn--small thumbnail-gym__button" to={generatePath(AppRoute.GymCard, { id: `${gym.id}` })}>Подробнее</Link>
        </div>
      </div>
    </li>
  );
}

export default GymCatalogItem;
