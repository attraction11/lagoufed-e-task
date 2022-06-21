import React from 'react'
import { FunctionComponent } from 'react'
import { RouterProps, Route, Navigate } from 'react-router-dom'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'

interface AdminRouteProps extends RouterProps {
  component: React.ComponentType<any>
}

const AdminRoute: FunctionComponent<AdminRouteProps> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const auth = isAuth()
        if (auth) {
          const { user: { role } } = auth as Jwt
          if (role === 1) { 
            return <Component {...props} />
          }
        }
        return <Navigate to='/signin'></Navigate>
      }}
    />
  )
}

export default AdminRoute
