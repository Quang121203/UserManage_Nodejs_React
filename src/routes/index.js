import Login from '../pages/Login';
import Register from '../pages/Register';
import User from '../pages/User';
import Role from '../pages/Role';
import GroupRole from '../pages/GroupRole';

import PrivateRoutes from './PrivateRoutes';


import { Route, Routes } from "react-router-dom";


function routes() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <PrivateRoutes>
            <User />
          </PrivateRoutes>
        }
      />

      <Route
        path="/role"
        element={
          <PrivateRoutes>
            <Role />
          </PrivateRoutes>
        }
      />

      <Route
        path="/group-role"
        element={
          <PrivateRoutes>
            <GroupRole />
          </PrivateRoutes>
        }
      />

    </Routes>
  );
}

export default routes;