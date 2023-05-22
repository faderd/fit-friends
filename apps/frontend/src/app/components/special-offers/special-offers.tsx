import { AppRoute } from '../../../const';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getNearestGym, getSpecialOffers } from '../../store/app-data/selectors';
import { useEffect, useState } from 'react';
import { fetchGyms, fetchTrainings } from '../../store/api-actions';
import { getUser } from '../../store/user-process/selectors';

const SPECIAL_OFFERS_COUNT = 3;

function SpecialOffers(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const specialTrainings = useAppSelector(getSpecialOffers(SPECIAL_OFFERS_COUNT));
  const user = useAppSelector(getUser);
  const nearestGym = useAppSelector(getNearestGym(user?.location));

  useEffect(() => {
    dispatch(fetchTrainings({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGyms());
  }, [dispatch]);

  const [activeSlide, setActiveSlide] = useState(1);

  const handleButtonClick = (selectedIndex: number) => {
    setActiveSlide(selectedIndex);
  }

  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>
          <ul className="special-offers__list">
            {
              specialTrainings.map((training, index) => (
                <li key={training.id} className={`${index + 1} special-offers__item ${activeSlide === index + 1 ? 'is-active' : ''}`}>
                  <aside className="promo-slider">
                    <div className="promo-slider__overlay"></div>
                    <div className="promo-slider__image">
                      <img
                        src={`${training.backgroundImage}.jpg`}
                        srcSet={`${training.backgroundImage}@2x.jpg 2x`}
                        width="1040" height="469" alt="promo" />
                    </div>
                    <div className="promo-slider__header">
                      <h3 className="promo-slider__title">{training.name}</h3>
                      <div className="promo-slider__logo">
                        <svg width="74" height="74" aria-hidden="true">
                          <use xlinkHref="#logotype"></use>
                        </svg>
                      </div>
                    </div><span className="promo-slider__text">{training.description}</span>
                    <div className="promo-slider__bottom-container">
                      <div className="promo-slider__slider-dots">
                        <button
                          className={`promo-slider__slider-dot${activeSlide === 1 ? ' promo-slider__slider-dot--active' : ''}`}
                          aria-label="первый слайд"
                          onClick={() => handleButtonClick(1)}
                        ></button>
                        <button
                          className={`promo-slider__slider-dot${activeSlide === 2 ? ' promo-slider__slider-dot--active' : ''}`}
                          aria-label="второй слайд"
                          onClick={() => handleButtonClick(2)}
                        ></button>
                        <button
                          className={`promo-slider__slider-dot${activeSlide === 3 ? ' promo-slider__slider-dot--active' : ''}`}
                          aria-label="третий слайд"
                          onClick={() => handleButtonClick(3)}
                        ></button>
                      </div>
                      <div className="promo-slider__price-container">
                        <p className="promo-slider__price">{training.price} ₽</p>
                        <p className="promo-slider__sup">за занятие</p>
                        <p className="promo-slider__old-price">2000 ₽</p>
                      </div>
                    </div>
                  </aside>
                </li>
              ))
            }
          </ul>

          <div className="thumbnail-spec-gym">
            <div className="thumbnail-spec-gym__image">
              <picture>
                <source type="image/webp" srcSet={`${nearestGym?.photos[0]}.webp, ${nearestGym?.photos[0]}@2x.webp 2x`} />
                <img src={`${nearestGym?.photos[0]}.jpg`} srcSet={`${nearestGym?.photos[0]}@2x.jpg 2x`} width="330" height="190" alt="" />
              </picture>
            </div>
            <p className="thumbnail-spec-gym__type">Ближайший зал</p>
            <div className="thumbnail-spec-gym__header">
              <h3 className="thumbnail-spec-gym__title">{nearestGym?.name}</h3>
              <div className="thumbnail-spec-gym__location">
                <svg width="14" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-location"></use>
                </svg>
                <address className="thumbnail-spec-gym__location-address">м. {nearestGym?.location}</address>
              </div>
            </div>
            <div className="thumbnail-spec-gym__button-wrapper">
              <Link className="btn btn--small thumbnail-spec-gym__button"
                to={''}
                onClick={(evt) => {
                  evt.preventDefault();
                  navigate(generatePath(AppRoute.GymCard, { id: nearestGym?.id?.toString() || null }));
                }}
              >Подробнее</Link>
              <Link className="btn btn--small btn--outlined thumbnail-spec-gym__button" to={AppRoute.GymsCatalog}>Все залы</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpecialOffers;
