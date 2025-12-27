import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/slices/userSlice';
import { deleteCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();

  // достаем navigate для навигации
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    // диспатчим экшен разлогина пользователя
    dispatch(logoutUser()).then(() => {
      // после экшена удаляем куки
      deleteCookie('accessToken');
      // удаляем токен обновления
      localStorage.clear();

      // переходим на главную
      navigate('/');
    });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
