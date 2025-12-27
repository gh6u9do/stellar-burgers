import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { selectIsUserAuth } from '@selectors';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/slices/userSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // чекаем аутентификацию юзера
  const isAuth = useSelector(selectIsUserAuth);
  // получаем сообщение об ошибке
  const errorText = useSelector((state) => state.user.error);

  useEffect(() => {
    // еслм пользователь уже аутентифицирован кидаем его в профиль
    if (isAuth) {
      navigate('/profile', { replace: true });
    }
  }, [isAuth, navigate]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // диспатчим логин
    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
