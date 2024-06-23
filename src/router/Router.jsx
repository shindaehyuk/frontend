import { Routes, Route } from 'react-router-dom';
import Main from '../page/Main';
import Login from '../page/Login';
import SignUp from '../page/Signup';
import TimeTable from '../page/TimeTable';
// import Admin from '../page/Admin';
// import PrivateRoute from '../components/route/PrivateRoute';
// import PublicRoute from '../components/route/PublicRoute';

function Router() {
  return (
    <>
      <Routes>
        {/* <Route Component={PrivateRoute}> */}
        <Route path="" Component={Login} />
        <Route path="/signup" Component={SignUp} />
        <Route path="/timetable" element={<Main />} />
        <Route path="/timetable/:user" element={<TimeTable />} />
        {/* </Route> */}
        {/* {/* <Route Component={PublicRoute}> */}

        {/* </Route> */}
      </Routes>
    </>
  );
}

export default Router;
