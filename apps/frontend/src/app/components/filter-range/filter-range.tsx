import { useSearchParams } from 'react-router-dom';

type FilterRangeProps = {
  maxValue: string;
  searchParamMin: string | null;
  searchParamMax: string | null;
  searchParamMinName: string;
  searchParamMaxName: string;
  isMarkValues?: boolean;
  classNameSuffix?: string;
}

function FilterRange({ maxValue, searchParamMin, searchParamMax, searchParamMinName, searchParamMaxName, isMarkValues, classNameSuffix }: FilterRangeProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className={`filter-${classNameSuffix ?? 'range'}`}>
      <div className={`filter-${classNameSuffix ?? 'range'}__scale`}>
        <div className={`filter-${classNameSuffix ?? 'range'}__bar`}
          style={{
            position: 'relative',
            left: `${(searchParamMin ? +searchParamMin : 0) / +maxValue * 100}%`,
            width: `${((searchParamMax ? +searchParamMax : 0) - (searchParamMin ? +searchParamMin : 0)) / +maxValue * 100 < 100 ? (((searchParamMax ? +searchParamMax : 0) - (searchParamMin ? +searchParamMin : 0)) / +maxValue * 100) : 100}%`,
            transition: '0.3s ease'
          }}
        ><span className="visually-hidden">Полоса прокрутки</span></div>
      </div>
      <div className={`filter-${classNameSuffix ?? 'range'}__control`}>
        <button className={`filter-${classNameSuffix ?? 'range'}__min-toggle`}
          style={{ left: `${(searchParamMin ? +searchParamMin : 0) / +maxValue * 100}%` }}
          onMouseDown={(evt) => {
            evt.preventDefault();
            const handleMouseMove = (evt: MouseEvent) => {
              const bar = document.querySelector('.filter-range__control');
              if (!bar) { return; }

              const range = bar.getBoundingClientRect();
              const newMinValue = Math.floor(((evt.clientX - range.left) / range.width) * (+maxValue ?? 1));

              if (newMinValue >= 0 && newMinValue < ((searchParamMax ? +searchParamMax : 0) ?? +maxValue ?? 1)) {
                searchParams.set(searchParamMinName, newMinValue.toString());
                setSearchParams(searchParams);
              }
            };
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', () => {
              document.removeEventListener('mousemove', handleMouseMove);
            });
          }}
          onClick={(evt) => { evt.preventDefault() }}
        >
          <span className="visually-hidden">Минимальное значение</span>
        </button>{isMarkValues && (<span>{searchParamMin}</span>)}

        <button className={`filter-${classNameSuffix ?? 'range'}__max-toggle`}
          style={{
            left: `${(
              (searchParamMax ? +searchParamMax : 0) / +maxValue * 100) < 100 ? ((searchParamMax ? +searchParamMax : 0) / +maxValue * 100) : 100}%`
          }}
          onMouseDown={(evt) => {
            evt.preventDefault();
            const handleMouseMove = (evt: MouseEvent) => {
              const bar = document.querySelector('.filter-range__control');
              if (!bar) { return; }

              const range = bar.getBoundingClientRect();
              const newMaxValue = Math.ceil(((evt.clientX - range.left) / range.width) * (+maxValue ?? 1));

              if (newMaxValue >= 0 && newMaxValue > ((searchParamMin ? +searchParamMin : 0) ?? +maxValue ?? 1) && newMaxValue <= +maxValue) {
                searchParams.set(searchParamMaxName, newMaxValue.toString());
                setSearchParams(searchParams);
              }
            };
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', () => {
              document.removeEventListener('mousemove', handleMouseMove);
            });
          }}
          onClick={(evt) => { evt.preventDefault() }}
        ><span className="visually-hidden">Максимальное значение</span>
        </button>{isMarkValues && (<span>{searchParamMax}</span>)}
      </div>
    </div>
  );
}

export default FilterRange;
