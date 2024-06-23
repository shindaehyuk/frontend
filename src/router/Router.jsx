import { Routes, Route } from 'react-router-dom';
import Main from '../page/Main';
import Login from '../page/Login';
import SignUp from '../page/Signup';
import TimeTable from '../page/TimeTable';
import TeamTimeTable from '../page/TeamTimeTable';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function Router() {
  return (
    <>
      <Routes>
        <Route Component={PrivateRoute}>
          <Route path="/timetable" element={<Main />} />
          <Route path="/timetable/:user" element={<TimeTable />} />
          <Route path="/timetable/team" element={<TeamTimeTable />} />
        </Route>
        <Route Component={PublicRoute}>
          <Route path="" Component={Login} />
          <Route path="/signup" Component={SignUp} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;
