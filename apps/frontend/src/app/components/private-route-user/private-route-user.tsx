import { AppRoute } from '../../../const';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getUser, isUserAuthorized } from '../../store/user-process/selectors';
import { UserRole } from '@fit-friends/shared-types';

type PrivateRouteProps = {
  children: JSX.Element,
}

function PrivateRouteUser({ children }: PrivateRouteProps): JSX.Element {
  const isAuthorized = useAppSelector(isUserAuthorized);
  const userRole = useAppSelector(getUser)?.role;

  return (
    (isAuthorized && userRole === UserRole.User)
      ? children
      : <Navigate to={AppRoute.Intro} />
  );
}

export default PrivateRouteUser;
