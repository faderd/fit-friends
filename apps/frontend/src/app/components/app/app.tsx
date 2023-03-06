import { AppRoute } from '../../../const';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { isAuthUnknown } from '../../store/user-process/selectors';

function App(): JSX.Element {
  const isAuthStatusUnknown = useAppSelector(isAuthUnknown);

  return (
    <Routes>
      <Route
        path={AppRoute.Intro}
        element={}
      />
    </Routes>
  );

}

export default App;
