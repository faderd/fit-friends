import { Gender, TrainingType, UserRole } from '@fit-friends/shared-types';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchQuestionnaire, updateQuestionnaire } from '../../store/api-actions';
import { getIsDataLoaded } from '../../store/app-data/selectors';
import { getQuestionnaire, getUser } from '../../store/user-process/selectors';
import SpecializationCheckbox from '../specialization-checkbox/specialization-checkbox';

const GenderMap = {
  [Gender.Female]: 'Женский',
  [Gender.Male]: 'Мужской',
  [Gender.NotImportant]: 'Не важно',
}

function UserInfo(): JSX.Element {
  const dispatch = useAppDispatch();

  const user = useAppSelector(getUser);
  const questionnaire = useAppSelector(getQuestionnaire);
  const isDataLoaded = useAppSelector(getIsDataLoaded);

  useEffect(() => {
    if (user) {
      dispatch(fetchQuestionnaire(user.id));
    }
  }, [dispatch, user]);

  const changeTrainingTypes = (newTrainingTypes: TrainingType[]) => {
    dispatch(updateQuestionnaire({trainingTypes: newTrainingTypes}));
  };

  return (
    <section className="user-info">
      <div className="user-info__header">
        <div className="input-load-avatar">
          <label>
            <input className="visually-hidden" type="file" name="user-photo-1" accept="image/png, image/jpeg" /><span className="input-load-avatar__avatar">
              <img src="img/content/user-photo-1.png" srcSet="img/content/user-photo-1@2x.png 2x" width="98" height="98" alt="user photo" /></span>
          </label>
        </div>
      </div>
      <form className="user-info__form" action="#" method="post">
        <button className="btn-flat btn-flat--underlined user-info__edit-button" type="button" aria-label="Редактировать">
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-edit"></use>
          </svg><span>Редактировать</span>
        </button>
        <div className="user-info__section">
          <h2 className="user-info__title">Обо мне</h2>
          <div className="custom-input custom-input--readonly user-info__input">
            <label><span className="custom-input__label">Имя</span><span className="custom-input__wrapper">
              <input type="text" name="name" value={user?.name ? user.name : ''} disabled /></span>
            </label>
          </div>
          {user?.role === UserRole.Coach && (<div className="custom-textarea custom-textarea--readonly user-info__textarea">
            <label><span className="custom-textarea__label">Описание</span>
              <textarea name="description" placeholder=" " disabled>{questionnaire?.merits}</textarea>
            </label>
          </div>)}
        </div>
        <div className="user-info__section user-info__section--status">
          <h2 className="user-info__title user-info__title--status">Статус</h2>
          <div className="custom-toggle custom-toggle--switch user-info__toggle">
            <label>
              <input
                type="checkbox"
                name="ready-for-training"
                disabled={!isDataLoaded}
                checked={questionnaire?.isReadyToTrain}
                onChange={() => {
                  if (questionnaire) {
                    dispatch(updateQuestionnaire({ isReadyToTrain: (!questionnaire.isReadyToTrain) }));
                  }
                }}
              /><span className={`custom-toggle__icon ${!isDataLoaded ? 'is-disabled' : ''}`}>
                <svg width="9" height="6" aria-hidden="true">
                  <use xlinkHref="#arrow-check"></use>
                </svg></span><span className="custom-toggle__label">Готов тренировать</span>
            </label>
          </div>
        </div>
        <div className="user-info__section">
          <h2 className="user-info__title user-info__title--specialization">Специализация</h2>
          <SpecializationCheckbox trainingTypes={questionnaire?.trainingTypes || []} setTrainingType={changeTrainingTypes} className='user-info__specialization' />
        </div>
        <div className="custom-select--readonly custom-select user-info__select"><span className="custom-select__label">Локация</span>
          <div className="custom-select__placeholder">ст. м. {user?.location}</div>
          <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" disabled><span className="custom-select__text"></span><span className="custom-select__icon">
            <svg width="15" height="6" aria-hidden="true">
              <use xlinkHref="#arrow-down"></use>
            </svg></span></button>
          <ul className="custom-select__list" role="listbox">
          </ul>
        </div>
        <div className="custom-select--readonly custom-select user-info__select"><span className="custom-select__label">Пол</span>
          <div className="custom-select__placeholder">{user && GenderMap[user.gender]}</div>
          <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" disabled><span className="custom-select__text"></span><span className="custom-select__icon">
            <svg width="15" height="6" aria-hidden="true">
              <use xlinkHref="#arrow-down"></use>
            </svg></span></button>
          <ul className="custom-select__list" role="listbox">
          </ul>
        </div>
        <div className="custom-select--readonly custom-select user-info__select"><span className="custom-select__label">Уровень</span>
          <div className="custom-select__placeholder">{questionnaire?.trainingLevel}</div>
          <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" disabled><span className="custom-select__text"></span><span className="custom-select__icon">
            <svg width="15" height="6" aria-hidden="true">
              <use xlinkHref="#arrow-down"></use>
            </svg></span></button>
          <ul className="custom-select__list" role="listbox">
          </ul>
        </div>
      </form>
    </section>
  );
}

export default UserInfo;
