import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectIsUserAuth,
  selectConstructorItems,
  selectOrderLoading,
  selectCreatedOrder
} from '../../services/selectors';
import { useNavigate } from 'react-router-dom';
import {
  clearNewOrder,
  createNewOrder
} from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: [DONE] взять переменные constructorItems, orderRequest и orderModalData из стора */

  // достаем constructorItems из constructorSlice
  const constructorItems = useSelector(selectConstructorItems);

  // заглушки пока нет слайса заказа
  const orderRequest = useSelector(selectOrderLoading);
  const orderModalData = useSelector(selectCreatedOrder);

  // достаем navigate
  const navigate = useNavigate();

  // достаем диспатч
  const dispatch = useDispatch();

  // получаем статус авторизации
  const isAuth = useSelector(selectIsUserAuth);

  // функция клика по кнопке оформить заказ
  const onOrderClick = () => {
    // проверяем авторизацию пользователя
    if (!isAuth) {
      navigate('/login');
      return;
    }

    // ливаем если не выбрали булочки или заказ уже в процессе
    if (!constructorItems.bun || orderRequest) return;

    // крафтим массив айдишников заказанного бургера
    const orderItems = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    // отправляем асинхронный экшен создания нового заказа
    dispatch(createNewOrder(orderItems));
  };

  // функция для закрытия модалки
  const closeOrderModal = () => {
    // вызываем экшен очистки нового заказа
    dispatch(clearNewOrder());
  };

  // функция считает цену всего бургера
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
