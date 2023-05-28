import { UserRole } from '@fit-friends/shared-types';
import { AppRoute, PageType } from '../../../const';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUser } from '../../store/user-process/selectors';
import { fetchNotifications, logout } from '../../store/api-actions';
import { getNotifications } from '../../store/app-data/selectors';
import { useEffect } from 'react';

type MainNavProps = {
  page?: PageType,
}

function MainNav({ page }: MainNavProps): JSX.Element {
  const dispatch = useAppDispatch();
  const userRole = useAppSelector(getUser)?.role;
  const navigate = useNavigate();
  const notifications = useAppSelector(getNotifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li className="main-nav__item">
          <Link className={`main-nav__link ${page === PageType.Index ? 'is-active' : ''}`} to={AppRoute.Index} aria-label="На главную">
            <svg width="18" height="18" aria-hidden="true">
              <use xlinkHref="#icon-home"></use>
            </svg></Link></li>
        <li className="main-nav__item main-nav__item--notifications">
          <Link className={`main-nav__link ${page === PageType.PersonalAccount ? 'is-active' : ''}`} aria-label="Личный кабинет" to={''}>
            <svg width="16" height="18" aria-hidden="true">
              <use xlinkHref="#icon-user"></use>
            </svg>
          </Link>
          <div className="main-nav__dropdown">
            <p className="main-nav__label">Меню</p>
            <ul className="main-nav__sublist">
              {page !== PageType.PersonalAccount && (<li className="main-nav__subitem">
                <Link className="notification" to={''}
                  onClick={(evt) => {
                    evt.preventDefault();
                    if (userRole === UserRole.Coach) {
                      navigate(AppRoute.PersonalAccountCoach);
                    } else if (userRole === UserRole.User) {
                      navigate(AppRoute.PersonalAccountUser);
                    }
                  }}>Личный кабинет</Link>
              </li>)}
              <li className="main-nav__subitem">
                <Link className="notification" to={''} onClick={() => { dispatch(logout()) }}>Выйти</Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="main-nav__item">
          <a className="main-nav__link" href="#" aria-label="Друзья">
            <svg width="22" height="16" aria-hidden="true">
              <use xlinkHref="#icon-friends"></use>
            </svg></a></li>
        <li className="main-nav__item main-nav__item--notifications">
          <a className="main-nav__link" href="#" aria-label="Уведомления">
            <svg width="14" height="18" aria-hidden="true">
              <use xlinkHref="#icon-notification"></use>
            </svg></a>
          <div className="main-nav__dropdown">
            <p className="main-nav__label">Оповещения</p>
            <ul className="main-nav__sublist">
              {
                notifications.map((notification) => (
                  <li className="main-nav__subitem"><a className="notification is-active" href="#">
                    <p className="notification__text">{notification.text}</p>
                    <time className="notification__time" dateTime="2023-12-23 12:35">{notification.notificationDate.toDateString()}</time></a>
                  </li>
                ))
              }
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
