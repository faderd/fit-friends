import { DEFAULT_SORT_DIRECTION, SearchParamMyTraining, SortDirection } from '../../../const';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { TrainingDuration, TrainingType } from '@fit-friends/shared-types';
import FilterRange from '../filter-range/filter-range';
import { useAppDispatch } from '../../hooks';
import { fetchTrainings } from '../../store/api-actions';

const TrainingDurationMap = {
  [TrainingDuration.Range10to30]: '10 мин - 30 мин',
  [TrainingDuration.Range30to50]: '30 мин - 50 мин',
  [TrainingDuration.Range50to80]: '50 мин - 80 мин',
  [TrainingDuration.RangeMore80]: 'больше 80 мин',
}
const DEFAULT_MIN_PRICE = '0';
const DEFAULT_MIN_CALORY = '0';
const MAX_RATE_VALUE = '5';
const MIN_RATE_VALUE = '0';

type MyTrainingsFilterProps = {
  setFilters: (filters: any) => void;
  maxPrice: string;
  maxCalory: string;
  classNamePrefix: string;
  isDurationBlockActive?: boolean;
  isSortingBlockActive?: boolean;
  isTrainingTypeBlockActive?: boolean;
}

function MyTrainingsFilter({ setFilters, maxPrice, maxCalory, classNamePrefix, isDurationBlockActive, isSortingBlockActive, isTrainingTypeBlockActive }: MyTrainingsFilterProps): JSX.Element {
  const dispatch = useAppDispatch();
  const formFormClassName = `${classNamePrefix}-form__form`;

  const [searchParams, setSearchParams] = useSearchParams();

  const searchParamMinPrice: string | null = searchParams.get(SearchParamMyTraining.MinPrice);
  const searchParamMaxPrice: string | null = searchParams.get(SearchParamMyTraining.MaxPrice);
  const searchParamMinCalories: string | null = searchParams.get(SearchParamMyTraining.MinCalories);
  const searchParamMaxCalories: string | null = searchParams.get(SearchParamMyTraining.MaxCalories);
  const searchParamMinRate: string | null = searchParams.get(SearchParamMyTraining.MinRate);
  const searchParamMaxRate: string | null = searchParams.get(SearchParamMyTraining.MaxRate);
  let searchParamTrainingDuration: string | string[] | null = searchParams.get(SearchParamMyTraining.TrainingDuration);
  let searchParamTrainingType: string | string[] | null = searchParams.get(SearchParamMyTraining.TrainingType);
  const searchParamSortDirecton: string | null = searchParams.get(SearchParamMyTraining.SortDirection);
  const searchParamIsOnlyFreeTrainings: string | null = searchParams.get(SearchParamMyTraining.IsOnlyFreeTrainings);

  useEffect(() => {
    setFilters({ searchParamMinPrice, searchParamMaxPrice, searchParamMinCalories, searchParamMaxCalories, searchParamMinRate, searchParamMaxRate, searchParamTrainingDuration, searchParamTrainingType });
  }, [searchParamMaxCalories, searchParamMaxPrice, searchParamMaxRate, searchParamMinCalories, searchParamMinPrice, searchParamMinRate, searchParamTrainingDuration, searchParamTrainingType, setFilters]);

  useEffect(() => {
    if (searchParamSortDirecton === null) { return; }
    dispatch(fetchTrainings({ sortDirection: searchParamSortDirecton }));
  }, [dispatch, searchParamSortDirecton]);

  useEffect(() => {
    if (!searchParamIsOnlyFreeTrainings) { return; }
    dispatch(fetchTrainings({isOnlyFreeTrainings: searchParamIsOnlyFreeTrainings}));
  }, [dispatch, searchParamIsOnlyFreeTrainings]);

  // Длительность тренировки====================================================
  if (searchParamTrainingDuration) {
    searchParamTrainingDuration = searchParamTrainingDuration.split(';');
  }

  const trainingDuratonKeys = Object.keys(TrainingDuration);
  type trainingDurationStrings = keyof typeof TrainingDuration;

  const getIsDurationChecked = (trainingDuration: TrainingDuration): boolean => {
    if (searchParamTrainingDuration && Array.isArray(searchParamTrainingDuration)) {
      return searchParamTrainingDuration.includes(trainingDuration);
    }
    return false;
  }

  // Максимальная цена==========================================================
  useEffect(() => {
    if (!searchParamMaxPrice && +maxPrice >= 0) {
      searchParams.set(SearchParamMyTraining.MaxPrice, maxPrice);
      setSearchParams(searchParams);
    }
  }, [maxPrice, searchParamMaxPrice, searchParams, setSearchParams]);

  // Минимальная цена===========================================================
  useEffect(() => {
    if (!searchParamMinPrice) {
      searchParams.set(SearchParamMyTraining.MinPrice, DEFAULT_MIN_PRICE);
      setSearchParams(searchParams);
    }
  }, [searchParamMinPrice, searchParams, setSearchParams]);

  // Сортировка=================================================================
  useEffect(() => {
    if (!searchParamSortDirecton && !searchParamIsOnlyFreeTrainings) {
      searchParams.set(SearchParamMyTraining.SortDirection, DEFAULT_SORT_DIRECTION);
      setSearchParams(searchParams);
    }
  }, [searchParamIsOnlyFreeTrainings, searchParamSortDirecton, searchParams, setSearchParams]);

  const getIsSortDirectionChecked = (sortDirection: SortDirection): boolean => {
    return searchParamSortDirecton === sortDirection;
  };

  // Максимум калорий===========================================================
  useEffect(() => {
    if (!searchParamMaxCalories && +maxCalory >= 0) {
      searchParams.set(SearchParamMyTraining.MaxCalories, maxCalory);
      setSearchParams(searchParams);
    }
  }, [maxCalory, searchParamMaxCalories, searchParams, setSearchParams]);

  // Минимальная цена===========================================================
  useEffect(() => {
    if (!searchParamMinCalories) {
      searchParams.set(SearchParamMyTraining.MinCalories, DEFAULT_MIN_CALORY);
      setSearchParams(searchParams);
    }
  }, [searchParamMinCalories, searchParams, setSearchParams]);

  // Максимальный рейтинг=====================================================
  useEffect(() => {
    if (!searchParamMaxRate && +MAX_RATE_VALUE >= 0) {
      searchParams.set(SearchParamMyTraining.MaxRate, MAX_RATE_VALUE);
      setSearchParams(searchParams);
    }
  }, [searchParamMaxRate, searchParams, setSearchParams]);

  // Минимальный рейтинг=======================================================
  useEffect(() => {
    if (!searchParamMinRate) {
      searchParams.set(SearchParamMyTraining.MinRate, MIN_RATE_VALUE);
      setSearchParams(searchParams);
    }
  }, [searchParamMinRate, searchParams, setSearchParams]);

  // Тип тренировки============================================================
  if (searchParamTrainingType) {
    searchParamTrainingType = searchParamTrainingType.split(';');
  }

  const trainingTypeKeys = Object.keys(TrainingType);
  type trainingTypeStrings = keyof typeof TrainingType;

  const getIsTypeChecked = (trainingType: TrainingType): boolean => {
    if (searchParamTrainingType && Array.isArray(searchParamTrainingType)) {
      return searchParamTrainingType.includes(trainingType);
    }
    return false;
  }

  return (
    <form className={formFormClassName}>
      <div className={`${classNamePrefix}-form__block ${classNamePrefix}-form__block--price`}>
        <h4 className={`${classNamePrefix}-form__block-title`}>Цена, ₽</h4>
        <div className="filter-price">
          <div className="filter-price__input-text filter-price__input-text--min">
            <input type="number" id="text-min" name="text-min"
              value={searchParamMinPrice?.toString()}
              onChange={(evt) => {
                searchParams.set(SearchParamMyTraining.MinPrice, evt.target.value || '0');
                setSearchParams(searchParams);
              }}
            />
            <label htmlFor="text-min">от</label>
          </div>
          <div className="filter-price__input-text filter-price__input-text--max">
            <input type="number" id="text-max" name="text-max"
              value={searchParamMaxPrice?.toString()}
              onChange={(evt) => {
                searchParams.set(SearchParamMyTraining.MaxPrice, evt.target.value || '0');
                setSearchParams(searchParams);
              }}
            />
            <label htmlFor="text-max">до</label>
          </div>
        </div>
        <FilterRange maxValue={maxPrice} searchParamMin={searchParamMinPrice} searchParamMax={searchParamMaxPrice} searchParamMinName={SearchParamMyTraining.MinPrice} searchParamMaxName={SearchParamMyTraining.MaxPrice} />
      </div>
      <div className={`${classNamePrefix}-form__block ${classNamePrefix}-form__block--calories`}>
        <h4 className={`${classNamePrefix}-form__block-title`}>Калории</h4>
        <div className="filter-calories">
          <div className="filter-calories__input-text filter-calories__input-text--min">
            <input type="number" id="text-min-cal" name="text-min-cal"
              value={searchParamMinCalories?.toString()}
              onChange={(evt) => {
                searchParams.set(SearchParamMyTraining.MinCalories, evt.target.value || '0');
                setSearchParams(searchParams);
              }}
            />
            <label htmlFor="text-min-cal">от</label>
          </div>
          <div className="filter-calories__input-text filter-calories__input-text--max">
            <input type="number" id="text-max-cal" name="text-max-cal"
              value={searchParamMaxCalories?.toString()}
              onChange={(evt) => {
                searchParams.set(SearchParamMyTraining.MaxCalories, evt.target.value || '0');
                setSearchParams(searchParams);
              }}
            />
            <label htmlFor="text-max-cal">до</label>
          </div>
        </div>
        <FilterRange maxValue={maxCalory} searchParamMin={searchParamMinCalories} searchParamMax={searchParamMaxCalories} searchParamMinName={SearchParamMyTraining.MinCalories} searchParamMaxName={SearchParamMyTraining.MaxCalories} />
      </div>
      <div className={`${classNamePrefix}-form__block ${classNamePrefix}-form__block--raiting`}>
        <h4 className={`${classNamePrefix}-form__block-title`}>Рейтинг</h4>
        <FilterRange maxValue={MAX_RATE_VALUE} searchParamMin={searchParamMinRate} searchParamMax={searchParamMaxRate} searchParamMinName={SearchParamMyTraining.MinRate} searchParamMaxName={SearchParamMyTraining.MaxRate} isMarkValues={true} classNameSuffix='raiting' />
      </div>
      {isDurationBlockActive && (
        <div className={`${classNamePrefix}-form__block ${classNamePrefix}-form__block--duration`}>
          <h4 className={`${classNamePrefix}-form__block-title`}>Длительность</h4>
          <ul className={`${classNamePrefix}-form__check-list`}>
            {
              trainingDuratonKeys.map((trainingDurationKey) => (
                <li key={trainingDurationKey} className={`${classNamePrefix}-form__check-list-item`}>
                  <div className="custom-toggle custom-toggle--checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={TrainingDuration[trainingDurationKey as trainingDurationStrings]}
                        name="duration"
                        checked={getIsDurationChecked(TrainingDuration[trainingDurationKey as trainingDurationStrings])}
                        onChange={(evt) => {
                          if (!searchParamTrainingDuration || !Array.isArray(searchParamTrainingDuration)) {
                            searchParamTrainingDuration = [];
                          }

                          if (!getIsDurationChecked(evt.target.value as TrainingDuration)) {
                            searchParamTrainingDuration.push(evt.target.value);
                          } else {
                            const paramForDeleteIndex = searchParamTrainingDuration.findIndex((param) => param === evt.target.value);
                            searchParamTrainingDuration.splice(paramForDeleteIndex, 1);
                          }

                          if (searchParamTrainingDuration.length === 0) {
                            searchParams.delete(SearchParamMyTraining.TrainingDuration);
                          } else {
                            searchParams.set(SearchParamMyTraining.TrainingDuration, searchParamTrainingDuration.join(';'));
                          }

                          setSearchParams(searchParams);
                        }}
                      /><span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg></span><span className="custom-toggle__label">{TrainingDurationMap[TrainingDuration[trainingDurationKey as trainingDurationStrings]]}</span>
                    </label>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      )}

      {isTrainingTypeBlockActive && (
        <div className="gym-catalog-form__block gym-catalog-form__block--type">
          <h4 className="gym-catalog-form__block-title">Тип</h4>
          <ul className="gym-catalog-form__check-list">
            {
              trainingTypeKeys.map((trainingTypeKey) => (
                <li className="gym-catalog-form__check-list-item">
                  <div className="custom-toggle custom-toggle--checkbox">
                    <label>
                      <input type="checkbox" name="type"
                        value={TrainingType[trainingTypeKey as trainingTypeStrings]}
                        checked={getIsTypeChecked(TrainingType[trainingTypeKey as trainingTypeStrings])}
                        onChange={(evt) => {
                          if (!searchParamTrainingType || !Array.isArray(searchParamTrainingType)) {
                            searchParamTrainingType = [];
                          }

                          if (!getIsTypeChecked(evt.target.value as TrainingType)) {
                            searchParamTrainingType.push(evt.target.value);
                          } else {
                            const paramForDeleteIndex = searchParamTrainingType.findIndex((param) => param === evt.target.value);
                            searchParamTrainingType.splice(paramForDeleteIndex, 1);
                          }

                          if (searchParamTrainingType.length === 0) {
                            searchParams.delete(SearchParamMyTraining.TrainingType);
                          } else {
                            searchParams.set(SearchParamMyTraining.TrainingType, searchParamTrainingType.join(';'));
                          }

                          setSearchParams(searchParams);
                        }}
                      /><span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg></span><span className="custom-toggle__label">{TrainingType[trainingTypeKey as trainingTypeStrings]}</span>
                    </label>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      )}

      {isSortingBlockActive && (
        <div className="gym-catalog-form__block gym-catalog-form__block--sort">
          <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
          <div className="btn-radio-sort gym-catalog-form__radio">
            <label>
              <input type="radio" name="sort"
                checked={getIsSortDirectionChecked(SortDirection.Asc)}
                onChange={() => {
                  searchParams.delete(SearchParamMyTraining.IsOnlyFreeTrainings);
                  searchParams.set(SearchParamMyTraining.SortDirection, SortDirection.Asc);
                  setSearchParams(searchParams);
                }}
              /><span className="btn-radio-sort__label">Дешевле</span>
            </label>
            <label>
              <input type="radio" name="sort"
                checked={getIsSortDirectionChecked(SortDirection.Desc)}
                onChange={() => {
                  searchParams.delete(SearchParamMyTraining.IsOnlyFreeTrainings);
                  searchParams.set(SearchParamMyTraining.SortDirection, SortDirection.Desc);
                  setSearchParams(searchParams);
                }}
              /><span className="btn-radio-sort__label">Дороже</span>
            </label>
            <label>
              <input type="radio" name="sort"
                checked={Boolean(searchParamIsOnlyFreeTrainings) === true}
                onChange={() => {
                  searchParams.delete(SearchParamMyTraining.SortDirection);
                  searchParams.set(SearchParamMyTraining.IsOnlyFreeTrainings, 'true');
                  setSearchParams(searchParams);
                }}
              /><span className="btn-radio-sort__label">Бесплатные</span>
            </label>
          </div>
        </div>
      )}
    </form>
  );
}

export default MyTrainingsFilter
