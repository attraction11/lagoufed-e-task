import React from 'react';
import { FunctionComponent } from "react";
import { RouterProps, Route, Navigate } from 'react-router-dom';
import { isAuth } from '../../helpers/auth';

interface PrivateRouteProps extends RouterProps {
  component: React.ComponentType<any>
}
 
const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  return <Route {...rest} render={props => { 
    const auth = isAuth()
    if (auth) { 
      return <Component {...props}/>
    }
    return <Navigate to='/signin'></Navigate>
  }} />
}
 
export default PrivateRoute;
