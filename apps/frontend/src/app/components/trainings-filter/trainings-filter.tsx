import { DEFAULT_SORT_DIRECTION, SearchParam, SortDirection } from '../../../const';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { TrainingDuration, TrainingType } from '@fit-friends/shared-types';
import FilterRange from '../filter-range/filter-range';
import { trainingsFilters } from '../../types/my-trainings-filters';
import FilterPrice from '../filter-price/filter-price';

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

type TrainingsFilterProps = {
  setFilters: (filters: trainingsFilters) => void;
  maxPrice: string;
  maxCalory: string;
  classNamePrefix: string;
  isDurationBlockActive?: boolean;
  isSortingBlockActive?: boolean;
  isTrainingTypeBlockActive?: boolean;
}

function TrainingsFilter({ setFilters, maxPrice, maxCalory, classNamePrefix, isDurationBlockActive, isSortingBlockActive, isTrainingTypeBlockActive }: TrainingsFilterProps): JSX.Element {
  const formFormClassName = `${classNamePrefix}-form__form`;

  const [searchParams, setSearchParams] = useSearchParams();

  const searchParamMinPrice: string = searchParams.get(SearchParam.MinPrice) || DEFAULT_MIN_PRICE;
  const searchParamMaxPrice: string = searchParams.get(SearchParam.MaxPrice) || maxPrice;
  const searchParamMinCalories: string | null = searchParams.get(SearchParam.MinCalories);
  const searchParamMaxCalories: string | null = searchParams.get(SearchParam.MaxCalories);
  const searchParamMinRate: string | null = searchParams.get(SearchParam.MinRate);
  const searchParamMaxRate: string | null = searchParams.get(SearchParam.MaxRate);
  let searchParamTrainingDuration: string | string[] | null = searchParams.get(SearchParam.TrainingDuration);
  let searchParamTrainingType: string | string[] | null = searchParams.get(SearchParam.TrainingType);
  const searchParamSortDirection: string | null = searchParams.get(SearchParam.SortDirection);
  const searchParamIsOnlyFreeTrainings: string | null = searchParams.get(SearchParam.IsOnlyFreeTrainings);

  useEffect(() => {
    setFilters({ searchParamMinPrice, searchParamMaxPrice, searchParamMinCalories, searchParamMaxCalories, searchParamMinRate, searchParamMaxRate, searchParamTrainingDuration, searchParamTrainingType, searchParamIsOnlyFreeTrainings, searchParamSortDirection });
  }, [searchParamIsOnlyFreeTrainings, searchParamMaxCalories, searchParamMaxPrice, searchParamMaxRate, searchParamMinCalories, searchParamMinPrice, searchParamMinRate, searchParamSortDirection, searchParamTrainingDuration, searchParamTrainingType, setFilters]);

  // useEffect(() => {
  //   if (searchParamSortDirecton === null) { return; }
  //   dispatch(fetchTrainings({ sortDirection: searchParamSortDirecton }));
  // }, [dispatch, searchParamSortDirecton]);

  // useEffect(() => {
  //   if (!searchParamIsOnlyFreeTrainings) { return; }
  //   dispatch(fetchTrainings({ isOnlyFreeTrainings: searchParamIsOnlyFreeTrainings }));
  // }, [dispatch, searchParamIsOnlyFreeTrainings]);
  console.log('point 2, searchParamIsOnlyFreeTrainings: ', searchParamIsOnlyFreeTrainings);

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
  // useEffect(() => {
  //   if (!searchParamMaxPrice && +maxPrice >= 0) {
  //     searchParams.set(SearchParam.MaxPrice, maxPrice);
  //     setSearchParams(searchParams);
  //   }
  // }, [maxPrice, searchParamMaxPrice, searchParams, setSearchParams]);

  // Минимальная цена===========================================================
  // useEffect(() => {
  //   if (!searchParamMinPrice) {
  //     searchParams.set(SearchParam.MinPrice, DEFAULT_MIN_PRICE);
  //     setSearchParams(searchParams);
  //   }
  // }, [searchParamMinPrice, searchParams, setSearchParams]);

  // Сортировка=================================================================
  useEffect(() => {
    if (!searchParamSortDirection && !searchParamIsOnlyFreeTrainings) {
      searchParams.set(SearchParam.SortDirection, DEFAULT_SORT_DIRECTION);
      setSearchParams(searchParams);
    }
  }, [searchParamIsOnlyFreeTrainings, searchParamSortDirection, searchParams, setSearchParams]);

  const getIsSortDirectionChecked = (sortDirection: SortDirection): boolean => {
    return searchParamSortDirection === sortDirection;
  };

  // Максимум калорий===========================================================
  useEffect(() => {
    if (!searchParamMaxCalories && +maxCalory >= 0) {
      searchParams.set(SearchParam.MaxCalories, maxCalory);
      setSearchParams(searchParams);
    }
  }, [maxCalory, searchParamMaxCalories, searchParams, setSearchParams]);

  // Минимум калорий============================================================
  useEffect(() => {
    if (!searchParamMinCalories) {
      searchParams.set(SearchParam.MinCalories, DEFAULT_MIN_CALORY);
      setSearchParams(searchParams);
    }
  }, [searchParamMinCalories, searchParams, setSearchParams]);

  // Максимальный рейтинг=====================================================
  useEffect(() => {
    if (!searchParamMaxRate && +MAX_RATE_VALUE >= 0) {
      searchParams.set(SearchParam.MaxRate, MAX_RATE_VALUE);
      setSearchParams(searchParams);
    }
  }, [searchParamMaxRate, searchParams, setSearchParams]);

  // Минимальный рейтинг=======================================================
  useEffect(() => {
    if (!searchParamMinRate) {
      searchParams.set(SearchParam.MinRate, MIN_RATE_VALUE);
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
        <FilterPrice
          searchParamMinPrice={searchParamMinPrice}
          searchParamMaxPrice={searchParamMaxPrice}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <FilterRange
          maxValue={maxPrice}
          searchParamMin={searchParamMinPrice}
          searchParamMax={searchParamMaxPrice}
          searchParamMinName={SearchParam.MinPrice}
          searchParamMaxName={SearchParam.MaxPrice}
        />
      </div>
      <div className={`${classNamePrefix}-form__block ${classNamePrefix}-form__block--calories`}>
        <h4 className={`${classNamePrefix}-form__block-title`}>Калории</h4>
        <div className="filter-calories">
          <div className="filter-calories__input-text filter-calories__input-text--min">
            <input type="number" id="text-min-cal" name="text-min-cal"
              value={searchParamMinCalories?.toString()}
              onChange={(evt) => {
                searchParams.set(SearchParam.MinCalories, evt.target.value || '0');
                setSearchParams(searchParams);
              }}
            />
            <label htmlFor="text-min-cal">от</label>
          </div>
          <div className="filter-calories__input-text filter-calories__input-text--max">
            <input type="number" id="text-max-cal" name="text-max-cal"
              value={searchParamMaxCalories?.toString()}
              onChange={(evt) => {
                searchParams.set(SearchParam.MaxCalories, evt.target.value || '0');
                setSearchParams(searchParams);
              }}
            />
            <label htmlFor="text-max-cal">до</label>
          </div>
        </div>
        <FilterRange maxValue={maxCalory} searchParamMin={searchParamMinCalories} searchParamMax={searchParamMaxCalories} searchParamMinName={SearchParam.MinCalories} searchParamMaxName={SearchParam.MaxCalories} />
      </div>
      <div className={`${classNamePrefix}-form__block ${classNamePrefix}-form__block--raiting`}>
        <h4 className={`${classNamePrefix}-form__block-title`}>Рейтинг</h4>
        <FilterRange maxValue={MAX_RATE_VALUE} searchParamMin={searchParamMinRate} searchParamMax={searchParamMaxRate} searchParamMinName={SearchParam.MinRate} searchParamMaxName={SearchParam.MaxRate} isMarkValues={true} classNameSuffix='raiting' />
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
                            searchParams.delete(SearchParam.TrainingDuration);
                          } else {
                            searchParams.set(SearchParam.TrainingDuration, searchParamTrainingDuration.join(';'));
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
                            searchParams.delete(SearchParam.TrainingType);
                          } else {
                            searchParams.set(SearchParam.TrainingType, searchParamTrainingType.join(';'));
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
                  searchParams.delete(SearchParam.IsOnlyFreeTrainings);
                  searchParams.set(SearchParam.SortDirection, SortDirection.Asc);
                  setSearchParams(searchParams);
                }}
              /><span className="btn-radio-sort__label">Дешевле</span>
            </label>
            <label>
              <input type="radio" name="sort"
                checked={getIsSortDirectionChecked(SortDirection.Desc)}
                onChange={() => {
                  searchParams.delete(SearchParam.IsOnlyFreeTrainings);
                  searchParams.set(SearchParam.SortDirection, SortDirection.Desc);
                  setSearchParams(searchParams);
                }}
              /><span className="btn-radio-sort__label">Дороже</span>
            </label>
            <label>
              <input type="radio" name="sort"
                checked={Boolean(searchParamIsOnlyFreeTrainings) === true}
                onChange={() => {
                  searchParams.delete(SearchParam.SortDirection);
                  searchParams.set(SearchParam.IsOnlyFreeTrainings, 'true');
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

export default TrainingsFilter
