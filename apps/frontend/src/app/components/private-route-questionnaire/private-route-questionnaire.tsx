import { AppRoute } from '../../../const';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getIsToQuestionnairePage } from '../../store/user-process/selectors';

type PrivateRouteProps = {
  children: JSX.Element,
}

function PrivateRouteQuestionnaire({ children }: PrivateRouteProps): JSX.Element {
  const isToQuestionnairePage = useAppSelector(getIsToQuestionnairePage);

  return (
    // если пользователь пытается зайти на вторую страницу регистрации (опросник), минуя первую, то его переадресует на первую страницу
    (isToQuestionnairePage)
      ? children
      : <Navigate to={AppRoute.Register} />
  );
}

export default PrivateRouteQuestionnaire;
