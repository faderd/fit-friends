import { AppRoute } from '../../../const';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { isAuthUnknown } from '../../store/user-process/selectors';
import IntroPage from '../../pages/intro-page/intro-page';
import RegisterPage from '../../pages/register-page/register-page';
import LoginPage from '../../pages/login-page/login-page';
import PrivateRouteQuestionnaire from '../private-route-questionnaire/private-route-questionnaire';
import QuestionnaireCoachPage from '../../pages/questionnaire-coach-page/questionnaire-coach-page';
import QuestionnaireUserPage from '../../pages/questionnaire-user-page/questionnaire-user-page';

function App(): JSX.Element {
  const isAuthStatusUnknown = useAppSelector(isAuthUnknown);

  return (
    <Routes>
      <Route
        path={AppRoute.Intro}
        element={<IntroPage />}
      />
      <Route
        path={AppRoute.Register}
        element={<RegisterPage />}
      />
      <Route
        path={AppRoute.Login}
        element={<LoginPage />}
      />
      <Route
        path={AppRoute.QuestionaireCoach}
        element={
          <PrivateRouteQuestionnaire>
            <QuestionnaireCoachPage />
          </PrivateRouteQuestionnaire>
        }
      />
      <Route
        path={AppRoute.QuestionaireUser}
        element={
          <PrivateRouteQuestionnaire>
            <QuestionnaireUserPage />
          </PrivateRouteQuestionnaire>
        }
      />
    </Routes>
  );

}

export default App;
