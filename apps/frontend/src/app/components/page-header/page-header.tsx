import { PageType } from '../../../const';
import MainNav from '../main-nav/main-nav';

type PageHeaderProps = {
  page: PageType,
}

function PageHeader({ page }: PageHeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container"><a className="header__logo" href="index.html" aria-label="Переход на главную">
        <svg width="187" height="70" aria-hidden="true">
          <use xlinkHref="#logo"></use>
        </svg></a>
        <MainNav page={page} />
        <div className="search">
          <form action="#" method="get">
            <label><span className="search__label">Поиск</span>
              <input type="search" name="search" />
              <svg className="search__icon" width="20" height="20" aria-hidden="true">
                <use xlinkHref="#icon-search"></use>
              </svg>
            </label>
            <ul className="search__list">
              <li className="search__item"><a className="search__link" href="#">Бокс</a></li>
              <li className="search__item"><a className="search__link is-active" href="#">Бег</a></li>
              <li className="search__item"><a className="search__link" href="#">Аэробика</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
            </ul>
          </form>
        </div>
      </div>
    </header>
  );
}

export default PageHeader;
