import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getTrainingsForMe } from '../../store/app-data/selectors';
import { fetchQuestionnaire, fetchSpecialForMeTrainings } from '../../store/api-actions';
import { getQuestionnaire, getUserId } from '../../store/user-process/selectors';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SPECIAL_TRAININGS_LIMIT = 9;

function SpecialForYouTrainings(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sliderRef = useRef<Slider>(null);


  const questionnaire = useAppSelector(getQuestionnaire);
  const userId = useAppSelector(getUserId);

  const trainingType = questionnaire && questionnaire.trainingTypes
    ? questionnaire.trainingTypes.join(';') : undefined;
  const trainingLevel = questionnaire && questionnaire.trainingLevel
    ? questionnaire.trainingLevel : undefined;

  const trainingsForMe = useAppSelector(getTrainingsForMe);

  useEffect(() => {
    dispatch(fetchQuestionnaire(userId || NaN));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(fetchSpecialForMeTrainings({
      limit: SPECIAL_TRAININGS_LIMIT.toString(),
      trainingType: trainingType,
      trainingLevel: trainingLevel
    }));
  }, [dispatch, trainingLevel, trainingType]);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
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
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">Специально подобрано для вас</h2>
            <div className="special-for-you__controls">
              <button className="btn-icon special-for-you__control" type="button" aria-label="previous"
                onClick={() => { sliderRef.current?.slickPrev() }}
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button className="btn-icon special-for-you__control" type="button" aria-label="next"
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
              trainingsForMe.map((training) => (
                <div key={training.id} className="special-for-you__item">
                  <div className="thumbnail-preview">
                    <div className="thumbnail-preview__image">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet={`${training.backgroundImage}.webp,
                          ${training.backgroundImage}@2x.webp 2x`} />
                        <img src={`${training.backgroundImage}.jpg`} srcSet={`${training.backgroundImage}@2x.jpg 2x`} width="452" height="191" alt="" />
                      </picture>
                    </div>
                    <div className="thumbnail-preview__inner">
                      <h3 className="thumbnail-preview__title">{training.name}</h3>
                      <div className="thumbnail-preview__button-wrapper">
                        <Link
                          className="btn btn--small thumbnail-preview__button"
                          to={''}
                          onClick={(evt) => {
                            evt.preventDefault();
                            navigate(generatePath(AppRoute.TrainingCard, { id: training.id?.toString() || null }))
                          }}>Подробнее</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default SpecialForYouTrainings;
