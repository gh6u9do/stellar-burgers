import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { selectFullUserSlice } from '@selectors';
import { registerUser } from '../../services/slices/userSlice';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // достаем данные из слайса юзера
  const { isAuth, loading, error } = useSelector(selectFullUserSlice);

  // обработчик сабмита формы регистрации
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // отправляем экшен регистрации в стор
    dispatch(
      registerUser({
        email: email,
        name: userName,
        password: password
      })
    );
  };

  // если успешно зарегистрировались — редиректим
  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
