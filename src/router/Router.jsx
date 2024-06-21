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
        <Route element={<Main />}>
          <Route path="main" element={<Main />} />
          <Route path="timetable/:personalName" element={<TimeTable />} />
        </Route>
        {/* </Route> */}
        {/* {/* <Route Component={PublicRoute}> */}
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={SignUp} />
        {/* </Route> */}
      </Routes>
    </>
  );
}

export default Router;
