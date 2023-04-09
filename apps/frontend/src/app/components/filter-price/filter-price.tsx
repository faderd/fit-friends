import { SearchParam } from '../../../const';

type FilterPriceProps = {
  searchParamMinPrice: string;
  searchParamMaxPrice: string;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
}

function FilterPrice({ searchParamMinPrice, searchParamMaxPrice, searchParams, setSearchParams }: FilterPriceProps): JSX.Element {
  return (
    <div className="filter-price">
      <div className="filter-price__input-text filter-price__input-text--min">
        <input type="number" id="text-min" name="text-min"
          value={searchParamMinPrice.toString()}
          onChange={(evt) => {
            searchParams.set(SearchParam.MinPrice, (+evt.target.value).toString());
            setSearchParams(searchParams);
          }}
        />
        <label htmlFor="text-min">от</label>
      </div>
      <div className="filter-price__input-text filter-price__input-text--max">
        <input type="number" id="text-max" name="text-max"
          value={searchParamMaxPrice.toString()}
          onChange={(evt) => {
            searchParams.set(SearchParam.MaxPrice, (+evt.target.value).toString());
            setSearchParams(searchParams);
          }}
        />
        <label htmlFor="text-max">до</label>
      </div>
    </div>
  );
}

export default FilterPrice;
