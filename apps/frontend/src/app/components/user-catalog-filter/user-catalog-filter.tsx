import { DEFAULT_FILTER_TRAINING_LEVEL, SearchParamUser } from '../../../const';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { TrainingLevel, TrainingType, UserLocation, UserRole } from '@fit-friends/shared-types';
import { UserFilters } from '../../types/user-filters';

type UserCatalogFilterProps = {
  setFilters: (filters: UserFilters) => void;
}

function UserCatalogFilter({setFilters}: UserCatalogFilterProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  let searchParamLocationFilter: string | string[] | null = searchParams.get(SearchParamUser.LocationFilter);
  let searchParamSpecialization: string | string[] | null = searchParams.get(SearchParamUser.Specialization);
  const searchParamTrainingLevel: string | null = searchParams.get(SearchParamUser.TrainingLevel);
  const searchParamUserTypeSorting: string | null = searchParams.get(SearchParamUser.UserRoleSorting);

  useEffect(() => {
    setFilters({searchParamLocationFilter, searchParamSpecialization, searchParamTrainingLevel, searchParamUserTypeSorting});
  }, [searchParamLocationFilter, searchParamSpecialization, searchParamTrainingLevel, searchParamUserTypeSorting, setFilters]);

  // Локация====================================================================
  const locationKeys = Object.keys(UserLocation);
  type UserLocationStrings = keyof typeof UserLocation;

  if (searchParamLocationFilter) {
    searchParamLocationFilter = searchParamLocationFilter.split(';');
  }

  const getIsLocationChecked = (location: UserLocation): boolean => {
    if (searchParamLocationFilter && Array.isArray(searchParamLocationFilter)) {
      return searchParamLocationFilter.includes(location);
    }
    return false;
  };

  // Специализация==============================================================
  if (searchParamSpecialization) {
    searchParamSpecialization = searchParamSpecialization.split(';');
  }

  const specializationKeys = Object.keys(TrainingType);
  type specializationStrings = keyof typeof TrainingType;

  const getIsSpecializatonChecked = (specialization: TrainingType): boolean => {
    if (searchParamSpecialization && Array.isArray(searchParamSpecialization)) {
      return searchParamSpecialization.includes(specialization);
    }
    return false;
  };

  // Уровень подготовки=========================================================
  const trainingLevelKeys = Object.keys(TrainingLevel);
  type trainingLevelStrings = keyof typeof TrainingLevel;

  useEffect(() => {
    if (!searchParamTrainingLevel) {
      searchParams.set(SearchParamUser.TrainingLevel, DEFAULT_FILTER_TRAINING_LEVEL)
      setSearchParams(searchParams);
    }
  }, [searchParamTrainingLevel, searchParams, setSearchParams])

  const getIsTrainingLevelChecked = (trainingLevel: TrainingLevel): boolean => searchParamTrainingLevel === trainingLevel;

  // Сортировка=================================================================
  const userRoleUserRef = useRef<HTMLInputElement | null>(null);
  const userRoleCoachRef = useRef<HTMLInputElement | null>(null);

  if (searchParamUserTypeSorting) {

    if (searchParamUserTypeSorting === UserRole.Coach && userRoleCoachRef.current) {
      userRoleCoachRef.current.checked = true;
    }
    if (searchParamUserTypeSorting === UserRole.User && userRoleUserRef.current) {
      userRoleUserRef.current.checked = true;
    }
  }

  const handleChangeUserType = () => {

    if (userRoleCoachRef.current?.checked) {
      searchParams.set(SearchParamUser.UserRoleSorting, UserRole.Coach);
    }

    if (userRoleUserRef.current?.checked) {
      searchParams.set(SearchParamUser.UserRoleSorting, UserRole.User);
    }

    setSearchParams(searchParams);
  };

  return (
    <form className="user-catalog-form__form">
      <div className="user-catalog-form__block user-catalog-form__block--location">
        <h4 className="user-catalog-form__block-title">Локация, станция метро</h4>
        <ul className="user-catalog-form__check-list">
          {locationKeys.map((locationKey) => {
            return (
              <li key={locationKey} className="user-catalog-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input type="checkbox" value={UserLocation[locationKey as UserLocationStrings]} name="user-agreement"
                      checked={getIsLocationChecked(UserLocation[locationKey as UserLocationStrings])}
                      onChange={(evt) => {
                        if (!searchParamLocationFilter || !Array.isArray(searchParamLocationFilter)) {
                          searchParamLocationFilter = [];
                        }
                        if (!searchParamLocationFilter) { return; }

                        if (!getIsLocationChecked(evt.target.value as UserLocation)) {
                          searchParamLocationFilter.push(evt.target.value);
                        } else {
                          // если элемент найден в searchParamLocationFilter, тогда удалим его
                          const paramForDeleteIndex = searchParamLocationFilter.findIndex((param) => param === evt.target.value);
                          searchParamLocationFilter.splice(paramForDeleteIndex, 1);
                        }

                        if (searchParamLocationFilter.length === 0) {
                          searchParams.delete(SearchParamUser.LocationFilter);
                        } else {
                          searchParams.set(SearchParamUser.LocationFilter, searchParamLocationFilter.join(';'));
                        }

                        setSearchParams(searchParams);
                      }}
                    /><span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg></span><span className="custom-toggle__label">{UserLocation[locationKey as UserLocationStrings]}</span>
                  </label>
                </div>
              </li>
            )
          })}

        </ul>
        <button className="btn-show-more user-catalog-form__btn-show" type="button"><span>Посмотреть все</span>
          <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </button>
      </div>
      <div className="user-catalog-form__block user-catalog-form__block--spezialization">
        <h4 className="user-catalog-form__block-title">Специализация</h4>
        <ul className="user-catalog-form__check-list">
          {specializationKeys.map((specializationKey) => (
            <li key={specializationKey} className="user-catalog-form__check-list-item">
              <div className="custom-toggle custom-toggle--checkbox">
                <label>
                  <input type="checkbox" value={TrainingType[specializationKey as specializationStrings]} name="spezialization"
                    checked={getIsSpecializatonChecked(TrainingType[specializationKey as specializationStrings])}
                    onChange={(evt) => {
                      if (!searchParamSpecialization || !Array.isArray(searchParamSpecialization)) {
                        searchParamSpecialization = [];
                      }

                      if (!getIsSpecializatonChecked(evt.target.value as TrainingType)) {
                        searchParamSpecialization.push(evt.target.value);
                      } else {
                        const paramForDeleteIndex = searchParamSpecialization.findIndex((param) => param === evt.target.value);
                        searchParamSpecialization.splice(paramForDeleteIndex, 1);
                      }

                      if (searchParamSpecialization.length === 0) {
                        searchParams.delete(SearchParamUser.Specialization);
                      } else {
                        searchParams.set(SearchParamUser.Specialization, searchParamSpecialization.join(';'));
                      }

                      setSearchParams(searchParams);
                    }}
                  /><span className="custom-toggle__icon">
                    <svg width="9" height="6" aria-hidden="true">
                      <use xlinkHref="#arrow-check"></use>
                    </svg></span>
                  <span className="custom-toggle__label">{TrainingType[specializationKey as specializationStrings]}</span>
                </label>
              </div>
            </li>
          ))}
        </ul>
        <button className="btn-show-more user-catalog-form__btn-show" type="button"><span>Посмотреть все</span>
          <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </button>
      </div>
      <div className="user-catalog-form__block user-catalog-form__block--level">
        <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
        <div className="custom-toggle-radio">
          {trainingLevelKeys.map((trainingLevelKey) => (
            <div key={trainingLevelKey} className="custom-toggle-radio__block">
              <label>
                <input type="radio" name="user-agreement"
                  value={TrainingLevel[trainingLevelKey as trainingLevelStrings]}
                  checked={getIsTrainingLevelChecked(TrainingLevel[trainingLevelKey as trainingLevelStrings])}
                  onChange={(evt) => {
                    searchParams.set(SearchParamUser.TrainingLevel, evt.target.value);
                    setSearchParams(searchParams);
                  }}

                /><span className="custom-toggle-radio__icon"></span><span className="custom-toggle-radio__label">{TrainingLevel[trainingLevelKey as trainingLevelStrings]}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="user-catalog-form__block">
        <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
        <div className="btn-radio-sort">
          <label>
            <input type="radio" name="sort" ref={userRoleCoachRef} onClick={handleChangeUserType} /><span className="btn-radio-sort__label">Тренеры</span>
          </label>
          <label>
            <input type="radio" name="sort" ref={userRoleUserRef} onClick={handleChangeUserType} /><span className="btn-radio-sort__label">Пользователи</span>
          </label>
        </div>
      </div>
    </form>
  );
}

export default UserCatalogFilter;
