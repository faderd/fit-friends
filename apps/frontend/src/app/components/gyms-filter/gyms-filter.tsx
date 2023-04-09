import { useEffect } from 'react';
import { SearchParam } from '../../../const';
import { gymFilters } from '../../types/gym-filters';
import { useSearchParams } from 'react-router-dom';
import FilterPrice from '../filter-price/filter-price';
import FilterRange from '../filter-range/filter-range';
import { GymOption, UserLocation } from '@fit-friends/shared-types';

const DEFAULT_MIN_PRICE = '0';

type GymsFilterProps = {
  setFilters: (filters: gymFilters) => void;
  maxPrice: string;
}

function GymsFilter({ setFilters, maxPrice }: GymsFilterProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParamMinPrice: string = searchParams.get(SearchParam.MinPrice) || DEFAULT_MIN_PRICE;
  const searchParamMaxPrice: string = searchParams.get(SearchParam.MaxPrice) || maxPrice;
  let searchParamLocation: string | string[] | null = searchParams.get(SearchParam.Location);
  let searchParamOptions: string | string[] | null = searchParams.get(SearchParam.GymOption);
  const searchParamIsOnlyVerified: string | null = searchParams.get(SearchParam.IsOnlyVerifiedGyms);

  useEffect(() => {
    setFilters({ searchParamMinPrice, searchParamMaxPrice, searchParamLocation, searchParamOptions, searchParamIsOnlyVerified });
  }, [searchParamOptions, searchParamLocation, searchParamMaxPrice, searchParamMinPrice, setFilters, searchParamIsOnlyVerified]);

  // Локация===================================================================
  if (searchParamLocation) {
    searchParamLocation = searchParamLocation.split(';');
  }

  const locationKeys = Object.keys(UserLocation);
  type locationStrings = keyof typeof UserLocation;

  const getIsLocationChecked = (location: UserLocation): boolean => {
    if (searchParamLocation) {
      return searchParamLocation.includes(location);
    }
    return false;
  };

  // Опции зала=================================================================
  if (searchParamOptions) {
    searchParamOptions = searchParamOptions.split(';');
  }

  const optionKeys = Object.keys(GymOption);
  type optionStrings = keyof typeof GymOption;

  const getIsOptionChecked = (option: GymOption): boolean => {
    if (searchParamOptions) {
      return searchParamOptions.includes(option);
    }
    return false;
  };

  return (
    <form className="gym-hall-form__form">
      <div className="gym-hall-form__block">
        <h4 className="gym-hall-form__block-title gym-hall-form__block-title--price">Цена, ₽</h4>
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
      <div className="gym-hall-form__block gym-hall-form__block--location">
        <h4 className="gym-hall-form__block-title">Локация, станция метро</h4>
        <ul className="gym-hall-form__check-list">
          {
            locationKeys.map((locationKey) => (
              <li key={locationKey} className="gym-hall-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value={UserLocation[locationKey as locationStrings]}
                      name="location"
                      checked={getIsLocationChecked(UserLocation[locationKey as locationStrings])}
                      onChange={(evt) => {
                        if (!searchParamLocation || !Array.isArray(searchParamLocation)) {
                          searchParamLocation = [];
                        }

                        if (!getIsLocationChecked(UserLocation[locationKey as locationStrings])) {
                          searchParamLocation.push(evt.target.value);
                        } else {
                          const paramForDeleteIndex = searchParamLocation.findIndex((param) => param === evt.target.value);
                          searchParamLocation.splice(paramForDeleteIndex, 1);
                        }

                        if (searchParamLocation.length === 0) {
                          searchParams.delete(SearchParam.Location);
                        } else {
                          searchParams.set(SearchParam.Location, searchParamLocation.join(';'));
                        }

                        setSearchParams(searchParams);
                      }}
                    /><span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg></span>
                    <span className="custom-toggle__label">
                      {UserLocation[locationKey as locationStrings]}
                    </span>
                  </label>
                </div>
              </li>
            ))
          }
        </ul>
        <button className="btn-show-more gym-hall-form__btn-show" type="button"><span>Посмотреть все</span>
          <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </button>
      </div>
      <div className="gym-hall-form__block gym-hall-form__block--addition">
        <h4 className="gym-hall-form__block-title">Дополнительно</h4>
        <ul className="gym-hall-form__check-list">
          {
            optionKeys.map((optionKey) => (
              <li key={optionKey} className="gym-hall-form__check-list-item">
                <div className="custom-toggle custom-toggle--checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value={GymOption[optionKey as optionStrings]}
                      name="addition"
                      onChange={(evt) => {
                        if (!searchParamOptions || !Array.isArray(searchParamOptions)) {
                          searchParamOptions = [];
                        }

                        if (!getIsOptionChecked(GymOption[optionKey as optionStrings])) {
                          searchParamOptions.push(evt.target.value);
                        } else {
                          const paramForDeleteIndex = searchParamOptions.findIndex((param) => param === evt.target.value);
                          searchParamOptions.splice(paramForDeleteIndex, 1);
                        }

                        if (searchParamOptions.length === 0) {
                          searchParams.delete(SearchParam.GymOption);
                        } else {
                          searchParams.set(SearchParam.GymOption, searchParamOptions.join(';'));
                        }

                        setSearchParams(searchParams);
                      }}
                    /><span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg></span>
                    <span className="custom-toggle__label">
                      {GymOption[optionKey as optionStrings]}
                    </span>
                  </label>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
      <div className="gym-hall-form__block">
        <h3 className="gym-hall-form__title gym-hall-form__title--status">Статус</h3>
        <div className="custom-toggle custom-toggle--switch">
          <label>
            <input
              type="checkbox"
              value="status-1"
              name="status"
              checked={Boolean(searchParamIsOnlyVerified)}
              onChange={() => {
                if (searchParamIsOnlyVerified) {
                  searchParams.delete(SearchParam.IsOnlyVerifiedGyms);
                } else {
                  searchParams.set(SearchParam.IsOnlyVerifiedGyms, 'true');
                }
                setSearchParams(searchParams);
              }}
            /><span className="custom-toggle__icon">
              <svg width="9" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-check"></use>
              </svg></span><span className="custom-toggle__label">Только проверенные</span>
          </label>
        </div>
      </div>
    </form>
  );
}

export default GymsFilter;
