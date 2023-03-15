import { AppRoute } from '../../../const';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { isUserAuthorized } from '../../store/user-process/selectors';

type PrivateRouteProps = {
  children: JSX.Element,
}

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {

  return (
    useAppSelector(isUserAuthorized)
      ? children
      : <Navigate to={AppRoute.Intro} />
  );
}

export default PrivateRoute;
