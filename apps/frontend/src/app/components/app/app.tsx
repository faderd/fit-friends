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
import PrivateRoute from '../private-route/private-route';
import IndexPage from '../../pages/index-page/index-page';
import LoadingPage from '../loading-page/loading-page';
import PrivateRouteUser from '../private-route-user/private-route-user';
import PrivateRouteCoach from '../private-route-coach/private-route-coach';
import PersonalAccountCoachPage from '../../pages/personal-account-coach-page/personal-account-coach-page';
import PersonalAccountUserPage from '../../pages/personal-account-user-page/personal-account-user-page';
import UsersCatalogPage from '../../pages/users-catalog-page/users-catalog-page';
import UserCardPage from '../../pages/user-card-page/user-card-page';
import CreateTrainingPage from '../../pages/create-training-page/create-training-page';
import MyTrainingsPage from '../../pages/my-trainings-page/my-trainings-page';
import TrainingCatalogPage from '../../pages/training-catalog-page/training-catalog-page';
import TrainingCardPage from '../../pages/training-card-page/training-card-page';
import GymsCatalogPage from '../../pages/gyms-catalog-page/gyms-catalog-page';
import GymCardPage from '../../pages/gym-card-page/gym-card-page';

function App(): JSX.Element {
  const isAuthStatusUnknown = useAppSelector(isAuthUnknown);

  if (isAuthStatusUnknown) {
    // Чтобы не мелькала страница логина, пока идет проверка авторизации отобразим страницу загрузки
    return (
      <LoadingPage />
    );
  }

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
      <Route
        path={AppRoute.Index}
        element={
          <PrivateRoute>
            <IndexPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.PersonalAccountCoach}
        element={
          <PrivateRouteCoach>
            <PersonalAccountCoachPage />
          </PrivateRouteCoach>
        }
      />
      <Route
        path={AppRoute.PersonalAccountUser}
        element={
          <PrivateRouteUser>
            <PersonalAccountUserPage />
          </PrivateRouteUser>
        }
      />
      <Route
        path={AppRoute.UsersCatalog}
        element={
          <PrivateRoute>
            <UsersCatalogPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.UserCard}
        element={
          <PrivateRoute>
            <UserCardPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.CreateTraining}
        element={
          <PrivateRouteCoach>
            <CreateTrainingPage />
          </PrivateRouteCoach>
        }
      />
      <Route
        path={AppRoute.MyTrainings}
        element={
          <PrivateRouteCoach>
            <MyTrainingsPage />
          </PrivateRouteCoach>
        }
      />
      <Route
        path={AppRoute.TrainingCard}
        element={
          <PrivateRoute>
            <TrainingCardPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.TrainingCatalog}
        element={
          <PrivateRouteUser>
            <TrainingCatalogPage />
          </PrivateRouteUser>
        }
      />
      <Route
        path={AppRoute.GymsCatalog}
        element={
          <PrivateRoute>
            <GymsCatalogPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.GymCard}
        element={
          <PrivateRoute>
            <GymCardPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );

}

export default App;
