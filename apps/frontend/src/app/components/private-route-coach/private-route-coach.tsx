import { AppRoute } from '../../../const';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getUserRole, isUserAuthorized } from '../../store/user-process/selectors';
import { UserRole } from '@fit-friends/shared-types';

type PrivateRouteProps = {
  children: JSX.Element,
}

function PrivateRouteCoach({ children }: PrivateRouteProps): JSX.Element {
  const isAuthorized = useAppSelector(isUserAuthorized);
  const userRole = useAppSelector(getUserRole);

  return (
    (isAuthorized && userRole === UserRole.Coach)
      ? children
      : <Navigate to={AppRoute.Intro} />
  );
}

export default PrivateRouteCoach;
