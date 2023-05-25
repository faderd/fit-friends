import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFoodDiary, getTrainingDiary } from '../../store/app-data/selectors';
import { fetchFoodDiary, fetchTrainingDiary } from '../../store/api-actions';

function MyProgressSection(): JSX.Element {
  const dispatch = useAppDispatch();
  const foodDiary = useAppSelector(getFoodDiary);
  const trainingDiary = useAppSelector(getTrainingDiary);

  useEffect(() => {
    dispatch(fetchFoodDiary());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTrainingDiary());
  }, [dispatch]);

  const [slidedMode, setSlidedMode] = useState(false);

  const getFoodDiaryCalory = (day: number) => foodDiary?.diary.reduce((result, diaryItem) => diaryItem.day === day ? diaryItem.caloriesCount + result : result, 0) ?? 0;

  const getDateByDay = (day: number) => {
    const currentDay = (new Date()).getDay();
    const calculatedDate = new Date();
    calculatedDate.setDate(calculatedDate.getDate() - (currentDay - day));

    return calculatedDate;
  };

  const getTrainingDiaryCalory = (day: number) => {
    return trainingDiary?.diary.reduce((result, diaryItem) => {
      const calculatedDate = getDateByDay(day);
      const trainingDate = new Date(diaryItem.dateTraining);

      return trainingDate.toDateString() === calculatedDate.toDateString() ? diaryItem.caloriesLoss + result : result;
    }, 0) ?? 0;
  }

  const getTotalCalories = (day: number) => {
    return getTrainingDiaryCalory(day) - getFoodDiaryCalory(day);
  };

  return (
    <section className="my-progress personal-account-user__my-progress">
      <div className="my-progress__sidebar">
        <svg className="my-progress__icon" width="46" height="51" aria-hidden="true">
          <use xlinkHref="#icon-chart-filled"></use>
        </svg>
        <ul className="my-progress__list">
          <li className="my-progress__item"><span>поступило, Ккал</span></li>
          <li className="my-progress__item"><span>ушло,<br /> Ккал</span></li>
          <li className="my-progress__item"><span>Итого за&nbsp;день, Ккал</span></li>
        </ul>
      </div>
      <div className="my-progress__content">
        <div className="my-progress__title-wrapper">
          <h2 className="my-progress__title">Мой прогресс</h2>
          <div className="my-progress__controls">
            <button className="btn-icon btn-icon--outlined my-progress__control" type="button" aria-label="previous"
              onClick={() => {
                setSlidedMode(false);
              }}
            >
              <svg width="11" height="8" aria-hidden="true">
                <use xlinkHref="#arrow-left"></use>
              </svg>
            </button>
            <button className="btn-icon btn-icon--outlined my-progress__control" type="button" aria-label="next"
              onClick={() => {
                setSlidedMode(true);
              }}
            >
              <svg width="11" height="8" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
          </div>
        </div>
        <table className="my-progress__table">
          <tr className="my-progress__row my-progress__row--head">
            {!slidedMode && (
              <>
                <th className="my-progress__cell my-progress__cell--head">пн</th>
                <th className="my-progress__cell my-progress__cell--head">вт</th>
                <th className="my-progress__cell my-progress__cell--head">ср</th>
              </>
            )}
            <th className="my-progress__cell my-progress__cell--head">чт</th>
            <th className="my-progress__cell my-progress__cell--head">пт</th>
            <th className="my-progress__cell my-progress__cell--head">сб</th>
            <th className="my-progress__cell my-progress__cell--head">вс</th>
          </tr>
          <tr className="my-progress__row">
            {!slidedMode && (
              <>
                <td className="my-progress__cell">{getFoodDiaryCalory(1)}</td>
                <td className="my-progress__cell">{getFoodDiaryCalory(2)}</td>
                <td className="my-progress__cell">{getFoodDiaryCalory(3)}</td>
              </>
            )}
            <td className="my-progress__cell">{getFoodDiaryCalory(4)}</td>
            <td className="my-progress__cell">{getFoodDiaryCalory(5)}</td>
            <td className="my-progress__cell">{getFoodDiaryCalory(6)}</td>
            <td className="my-progress__cell">{getFoodDiaryCalory(7)}</td>
          </tr>
          <tr className="my-progress__row">
            {!slidedMode && (
              <>
                <td className="my-progress__cell">{getTrainingDiaryCalory(1)}</td>
                <td className="my-progress__cell">{getTrainingDiaryCalory(2)}</td>
                <td className="my-progress__cell">{getTrainingDiaryCalory(3)}</td>
              </>
            )}
            <td className="my-progress__cell">{getTrainingDiaryCalory(4)}</td>
            <td className="my-progress__cell">{getTrainingDiaryCalory(5)}</td>
            <td className="my-progress__cell">{getTrainingDiaryCalory(6)}</td>
            <td className="my-progress__cell">{getTrainingDiaryCalory(7)}</td>
          </tr>
          <tr className="my-progress__row">
            {!slidedMode && (
              <>
                <td
                  className={`my-progress__cell my-progress__cell--${getTotalCalories(1) < 0 ? 'red' : 'green'}`}>
                  {Math.abs(getTotalCalories(1))}</td>
                  <td
                  className={`my-progress__cell my-progress__cell--${getTotalCalories(2) < 0 ? 'red' : 'green'}`}>
                  {Math.abs(getTotalCalories(2))}</td>
                  <td
                  className={`my-progress__cell my-progress__cell--${getTotalCalories(3) < 0 ? 'red' : 'green'}`}>
                  {Math.abs(getTotalCalories(3))}</td>
              </>
            )}
            <td
                  className={`my-progress__cell my-progress__cell--${getTotalCalories(4) < 0 ? 'red' : 'green'}`}>
                  {Math.abs(getTotalCalories(4))}</td>
                  <td
                  className={`my-progress__cell my-progress__cell--${getTotalCalories(5) < 0 ? 'red' : 'green'}`}>
                  {Math.abs(getTotalCalories(5))}</td>
                  <td
                  className={`my-progress__cell my-progress__cell--${getTotalCalories(6) < 0 ? 'red' : 'green'}`}>
                  {Math.abs(getTotalCalories(6))}</td>
                  <td
                  className={`my-progress__cell my-progress__cell--${getTotalCalories(7) < 0 ? 'red' : 'green'}`}>
                  {Math.abs(getTotalCalories(7))}</td>
          </tr>
        </table>
      </div>
    </section>
  );
}

export default MyProgressSection;
