import { AppRoute } from '../../../const';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getLookForCompanyUsers } from '../../store/user-process/selectors';
import { useEffect, useRef } from 'react';
import { fetchLookingForCompanyUsers } from '../../store/api-actions';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import UserCatalogItem from '../user-catalog-item/user-catalog-item';

const USERS_LIMIT = 8;

function LookForCompanySection(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sliderRef = useRef<Slider>(null);

  const users = useAppSelector(getLookForCompanyUsers);

  useEffect(() => {
    dispatch(fetchLookingForCompanyUsers({ limit: USERS_LIMIT }));
  }, [dispatch]);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1460,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ],
  };

  return (
    <section className="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
            <button className="btn-flat btn-flat--light look-for-company__button" type="button" onClick={() => { navigate(AppRoute.UsersCatalog) }}><span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="look-for-company__controls">
              <button className="btn-icon btn-icon--outlined look-for-company__control" type="button" aria-label="previous"
                onClick={() => { sliderRef.current?.slickPrev() }}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button className="btn-icon btn-icon--outlined look-for-company__control" type="button" aria-label="next"
                onClick={() => { sliderRef.current?.slickNext() }}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <Slider {...sliderSettings} ref={sliderRef}>
            {
              users.map((user) => (
                <UserCatalogItem user={user} isDark/>
              ))
            }
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default LookForCompanySection;
