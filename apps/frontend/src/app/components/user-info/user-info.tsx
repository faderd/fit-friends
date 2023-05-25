import { CoachMeritsLengthRange, Gender, TrainingLevel, TrainingType, UserLocation, UserNameLengthRange, UserRole } from '@fit-friends/shared-types';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchQuestionnaire, updateQuestionnaire, updateUser } from '../../store/api-actions';
import { getIsDataLoaded } from '../../store/app-data/selectors';
import { getQuestionnaire, getUser } from '../../store/user-process/selectors';
import { QuestionnaireData } from '../../types/questionnaire-data';
import SpecializationCheckbox from '../specialization-checkbox/specialization-checkbox';

type UserInfoProps = {
  setParentIsRedactMode?: (isRedactMode: boolean) => void,
  burnsCaloriesPerDay?: number,
}

type ReactHookFormData = {
  name: string,
  merits: string,
}

function UserInfo({setParentIsRedactMode, burnsCaloriesPerDay}: UserInfoProps): JSX.Element {
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
    dispatch(updateQuestionnaire({ trainingTypes: newTrainingTypes }));
  };

  const [isRedactMode, setIsRedactMode] = useState(false);
  const [location, setLocation] = useState(user?.location);
  const [gender, setGender] = useState(user?.gender);
  const [trainingLevel, setTrainingLevel] = useState(questionnaire?.trainingLevel);

  const locationWrapperRef = useRef<HTMLDivElement | null>(null);
  const locationSelectTextRef = useRef<HTMLSpanElement | null>(null);
  const genderWrapperRef = useRef<HTMLDivElement | null>(null);
  const genderSelectTextRef = useRef<HTMLSpanElement | null>(null);
  const trainingLevelWrapperRef = useRef<HTMLDivElement | null>(null);
  const trainingLevelSelectTextRef = useRef<HTMLSpanElement | null>(null);

  const handleListButtonClick = (wrapperRef: React.MutableRefObject<HTMLDivElement | null>) => {
    wrapperRef.current?.classList.toggle('is-open');
  }

  const locationKeys = Object.keys(UserLocation);
  type UserLocationStrings = keyof typeof UserLocation;

  const genderKeys = Object.keys(Gender);
  type genderStrings = keyof typeof Gender;

  const trainingLevelKeys = Object.keys(TrainingLevel);
  type trainingLevelStrings = keyof typeof TrainingLevel;

  const handleLocatonItemClick = (locationValue: UserLocationStrings) => {
    setLocation(UserLocation[locationValue]);
    locationWrapperRef.current?.classList.toggle('is-open');

    if (locationSelectTextRef.current) {
      locationSelectTextRef.current.textContent = UserLocation[locationValue];
    }

    locationWrapperRef.current?.classList.add('not-empty');
    locationWrapperRef.current?.classList.remove('custom-select--not-selected');
  };

  const handleGenderItemClick = (genderValue: genderStrings) => {
    setGender(Gender[genderValue]);
    genderWrapperRef.current?.classList.toggle('is-open');

    if (genderSelectTextRef.current) {
      genderSelectTextRef.current.textContent = Gender[genderValue];
    }

    genderWrapperRef.current?.classList.add('not-empty');
    genderWrapperRef.current?.classList.remove('custom-select--not-selected');
  };

  const handleTrainingLevelItemClick = (trainingLevelValue: trainingLevelStrings) => {
    setTrainingLevel(TrainingLevel[trainingLevelValue]);
    trainingLevelWrapperRef.current?.classList.toggle('is-open');

    if (trainingLevelSelectTextRef.current) {
      trainingLevelSelectTextRef.current.textContent = TrainingLevel[trainingLevelValue];
    }

    trainingLevelWrapperRef.current?.classList.add('not-empty');
    trainingLevelWrapperRef.current?.classList.remove('custom-select--not-selected');
  };

  const getLocationsMarkup = () => {
    return (
      locationKeys.map((key) => {
        return (
          <li key={key} className="custom-select__item" onClick={() => handleLocatonItemClick(key as UserLocationStrings)}>{UserLocation[key as UserLocationStrings]}</li>
        )
      })
    );
  };

  const getGenderMarkup = () => {
    return (
      genderKeys.map((key) => {
        return (
          <li key={key} className="custom-select__item" onClick={() => handleGenderItemClick(key as genderStrings)}>{Gender[key as genderStrings]}</li>
        )
      })
    );
  };

  const getTrainingLevelMarkup = () => {
    return (
      trainingLevelKeys.map((key) => {
        return (
          <li key={key} className="custom-select__item" onClick={() => handleTrainingLevelItemClick(key as trainingLevelStrings)}>{TrainingLevel[key as trainingLevelStrings]}</li>
        )
      })
    );
  };

  const { register, handleSubmit, formState: { errors } } = useForm<ReactHookFormData>();

  const onSubmit: SubmitHandler<ReactHookFormData> = (reactHookFormData) => {
    const userUpdateData = {
      name: reactHookFormData.name,
      gender: gender,
      location: location,
    };
    const questionnaireUpdateData: QuestionnaireData = {
      trainingLevel,
      burnsCaloriesPerDay
    };
    if (user?.role === UserRole.Coach) {
      questionnaireUpdateData.merits = reactHookFormData.merits;
    }

    dispatch(updateUser(userUpdateData))
    dispatch(updateQuestionnaire(questionnaireUpdateData));

    setIsRedactMode(false);
    setParentIsRedactMode && setParentIsRedactMode(false);
  };

  const getForm = () => (
    <section className={`user-info${isRedactMode ? '-edit' : ''}`}>
      <div className={`user-info${isRedactMode ? '-edit' : ''}__header`}>
        <div className="input-load-avatar">
          <label>
            <input className="visually-hidden" type="file" name="user-photo-1" accept="image/png, image/jpeg" /><span className="input-load-avatar__avatar">
              <img src="img/content/user-photo-1.png" srcSet="img/content/user-photo-1@2x.png 2x" width="98" height="98" alt="user photo" /></span>
          </label>
        </div>
        {isRedactMode && (
          <div className="user-info-edit__controls">
            <button className="user-info-edit__control-btn" aria-label="обновить">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-change"></use>
              </svg>
            </button>
            <button className="user-info-edit__control-btn" aria-label="удалить">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-trash"></use>
              </svg>
            </button>
          </div>
        )}
      </div>
      <form className={`user-info${isRedactMode ? '-edit' : ''}__form`} onSubmit={handleSubmit(onSubmit)}>

        {isRedactMode && (<button className='btn-flat btn-flat--underlined user-info-edit__save-button' type="button" aria-label="Редактировать"
          onClick={handleSubmit(onSubmit)}>
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-edit"></use>
          </svg><span>Сохранить</span>
        </button>)}

        {!isRedactMode && (<button className='btn-flat btn-flat--underlined user-info__edit-button' type="button" aria-label="Редактировать"
          onClick={() => {
            setIsRedactMode(true);
            setParentIsRedactMode && setParentIsRedactMode(true);
          }}>
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="#icon-edit"></use>
          </svg><span>Редактировать</span>
        </button>)}

        <div className={`user-info${isRedactMode ? '-edit' : ''}__section`}>
          <h2 className={`user-info${isRedactMode ? '-edit' : ''}__title`}>Обо мне</h2>
          <div className={`custom-input user-info${isRedactMode ? '-edit' : ''}__input ${isRedactMode ? '' : 'custom-input--readonly'} ${errors.name && 'custom-input--error'}`}>
            <label>
              <span className="custom-input__label">Имя</span>
              <span className="custom-input__wrapper">
                <input
                  type="text"
                  defaultValue={user?.name ? user.name : ''}
                  disabled={isRedactMode ? false : true}
                  {...register('name', {
                    required: true,
                    minLength: UserNameLengthRange.Min,
                    maxLength: UserNameLengthRange.Max,
                    pattern: /^[а-яёa-z]+$/iu
                  })} />
              </span>
              {errors.name && (<span className='custom-input__error'>{`Длина от ${UserNameLengthRange.Min} до ${UserNameLengthRange.Max} символов`}</span>)}
            </label>
          </div>
          {user?.role === UserRole.Coach && (
            <div className={`custom-textarea user-info${isRedactMode ? '-edit' : ''}__textarea ${isRedactMode ? '' : 'custom-textarea--readonly'} ${errors.merits && 'custom-textarea--error'}`}>
              <label><span className="custom-textarea__label">Описание</span>
                <textarea
                  placeholder=" "
                  defaultValue={questionnaire?.merits}
                  disabled={isRedactMode ? false : true}
                  {...register('merits', {
                    required: true,
                    minLength: CoachMeritsLengthRange.Min,
                    maxLength: CoachMeritsLengthRange.Max
                  })}
                ></textarea>
                {errors.merits && (<span className='custom-input--error custom-textarea--error'>{`Возможное значение от ${CoachMeritsLengthRange.Min} до ${CoachMeritsLengthRange.Max} символов`}</span>)}
              </label>
            </div>)}
        </div>

        <div className={`user-info${isRedactMode ? '-edit' : ''}__section user-info${isRedactMode ? '-edit' : ''}__section--status`}>
          <h2 className={`user-info${isRedactMode ? '-edit' : ''}__title user-info${isRedactMode ? '-edit' : ''}__title--status`}>Статус</h2>
          <div className={`custom-toggle custom-toggle--switch user-info${isRedactMode ? '-edit' : ''}__toggle`}>
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
                </svg></span><span className="custom-toggle__label">{user?.role === UserRole.Coach ? 'Готов тренировать' : 'Готов к тренировке' }</span>
            </label>
          </div>
        </div>

        <div className={`user-info${isRedactMode ? '-edit' : ''}__section`}>
          <h2 className={`user-info${isRedactMode ? '-edit' : ''}__title user-info${isRedactMode ? '-edit' : ''}__title--specialization`}>Специализация</h2>
          <SpecializationCheckbox trainingTypes={questionnaire?.trainingTypes || []} setTrainingType={changeTrainingTypes} className='user-info__specialization' />
        </div>

        <div className={`${isRedactMode ? '' : 'custom-select--readonly'} custom-select user-info${isRedactMode ? '-edit' : ''}__select`} ref={locationWrapperRef}><span className="custom-select__label">Локация</span>

          <div className="custom-select__placeholder">ст. м. {location}</div>
          <button
            className="custom-select__button"
            type="button"
            aria-label="Выберите одну из опций"
            onClick={() => { handleListButtonClick(locationWrapperRef) }}
            disabled={!isRedactMode}
          >
            <span className="custom-select__text"
              ref={locationSelectTextRef}
            ></span>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg>
            </span>
          </button>
          <ul className="custom-select__list" role="listbox">
            {getLocationsMarkup()}
          </ul>
        </div>

        <div className={`${isRedactMode ? '' : 'custom-select--readonly'} custom-select user-info${isRedactMode ? '-edit' : ''}__select`} ref={genderWrapperRef}><span className="custom-select__label">Пол</span>
          <div className="custom-select__placeholder">{gender}</div>
          <button
            className="custom-select__button"
            type="button"
            aria-label="Выберите одну из опций"
            onClick={() => { handleListButtonClick(genderWrapperRef) }}
            disabled={!isRedactMode}>
            <span className="custom-select__text" ref={genderSelectTextRef}></span><span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg></span></button>
          <ul className="custom-select__list" role="listbox">
            {getGenderMarkup()}
          </ul>
        </div>

        <div className={`${isRedactMode ? '' : 'custom-select--readonly'} custom-select user-info${isRedactMode ? '-edit' : ''}__select`} ref={trainingLevelWrapperRef}><span className="custom-select__label">Уровень</span>
          <div className="custom-select__placeholder">{questionnaire?.trainingLevel}</div>
          <button
            className="custom-select__button"
            type="button"
            aria-label="Выберите одну из опций"
            onClick={() => { handleListButtonClick(trainingLevelWrapperRef) }}
            disabled={!isRedactMode}>
            <span className="custom-select__text" ref={trainingLevelSelectTextRef}></span><span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-down"></use>
              </svg></span></button>
          <ul className="custom-select__list" role="listbox">
            {getTrainingLevelMarkup()}
          </ul>
        </div>
      </form>
    </section>
  );

  return (
    getForm()
  );
}

export default UserInfo;
