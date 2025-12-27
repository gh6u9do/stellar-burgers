import { TProtectedRouteProps } from './type';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import {
  selectIsAuthCheked,
  selectIsUserAuth,
  selectUserData
} from '@selectors';
import { Preloader } from '@ui';

export function ProtectedRoute({
  onlyUnAuth = false,
  children
}: TProtectedRouteProps) {
  // onlyUnAuth - флаг, показывающий что маршрут только для НЕАВТОРИЗОВАННЫХ

  const location = useLocation();

  // проверяем прошла ли вообще проверка авторизации пользователя
  const authCheked = useSelector(selectIsAuthCheked);
  // запрашиваем пользовательские данные из стора
  const user = useSelector(selectUserData);

  // пока идет проверка - показываем прелоадер
  if (!authCheked) {
    return <Preloader />;
  }

  // если роут закрыт для НЕавторизованных (гость не должен сюда попасть)
  if (!onlyUnAuth && !user) {
    return <Navigate to={'/login'} replace state={{ from: location }} />;
  }

  // если роут закрыт для авторизованных (т.е. авторизованный не долежн сюда попасть)
  if (onlyUnAuth && user) {
    const from = location.state?.from || '/';
    return <Navigate to={from} replace />;
  }

  return children;
}
