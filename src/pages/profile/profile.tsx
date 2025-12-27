import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectUserData } from '@selectors';
import { updateUser } from '../../services/slices/userSlice';

export const Profile: FC = () => {
  /** TODO: [DONE] взять переменную из стора */

  const dispatch = useDispatch();

  // берем юзера из стора
  const user = useSelector(selectUserData);

  // const user = {
  //   name: '',
  //   email: ''
  // };

  const [formValue, setFormValue] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: ''
  });

  // обновляем форму когда user из стора обновился
  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  // проверяем изменилось ли что-то на форме
  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  //обработчик сабмита формы редактирования данных
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // диспатчим экшен обновления данных
    dispatch(updateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};
