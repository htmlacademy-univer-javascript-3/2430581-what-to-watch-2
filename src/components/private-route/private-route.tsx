import { AppRoute, AuthStatus } from '../../const/const.ts';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  authStatus: AuthStatus;
  children: JSX.Element;
}
const PrivateRoute = ({authStatus, children}: PrivateRouteProps) => (
  authStatus === AuthStatus.Auth
    ? children
    : <Navigate to={AppRoute.SignIn}></Navigate>
);

export default PrivateRoute;
