import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getPopularTrainings } from '../../store/app-data/selectors';
import { useEffect } from 'react';
import { fetchPopularTrainings } from '../../store/api-actions';
import TrainingItem from '../training-item/training-item';

const POPULAR_TRAININGS_LIMIT = 4;

function PopularTrainingsSection(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const popularTrainings = useAppSelector(getPopularTrainings);

  useEffect(() => {
    dispatch(fetchPopularTrainings({ limit: POPULAR_TRAININGS_LIMIT.toString() }));
  }, [dispatch]);

  return (
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <button className="btn-flat popular-trainings__button" type="button"
              onClick={() => { navigate(AppRoute.TrainingCatalog) }}
            ><span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="popular-trainings__controls">
              <button className="btn-icon popular-trainings__control" type="button" aria-label="previous"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button className="btn-icon popular-trainings__control" type="button" aria-label="next"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="popular-trainings__list">
            {
              popularTrainings.map((training) => (
                <TrainingItem
                  training={training}
                  liClassName={'popular-trainings__item'}
                />
              ))
            }
          </ul>
        </div>
      </div>
    </section>
  );
}

export default PopularTrainingsSection;
