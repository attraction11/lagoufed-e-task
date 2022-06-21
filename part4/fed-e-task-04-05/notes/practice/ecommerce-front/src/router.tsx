import React from 'react';
import { FunctionComponent } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './components/core/Home';
import Shop from './components/core/Shop';
import Signin from './components/core/Signin';
import Signup from './components/core/Signup'
import Dashboard from './components/admin/Dashboard';
import PrivateRoute from './components/admin/PrivateRoute';
import AdminRoute from './components/admin/AdminRoute';
import AdminDashboard from './components/admin/AdminDashboard';


interface RouterProps {}
 
const Router: FunctionComponent<RouterProps> = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='shop' element={<Shop />}></Route>
        <Route path='signin' element={<Signin />}></Route>
        <Route path='signup' element={<Signup />}></Route>
        <PrivateRoute path='/user/dashboard' element={<Dashboard />} />
        <AdminRoute path='/admin/dashboard' element={<AdminDashboard />} />
      </Routes>
    </HashRouter>
  )
}
 
export default Router
