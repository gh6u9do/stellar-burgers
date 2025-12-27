import { selectFeed } from '@selectors';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { fetchFeeds } from '../../services/slices/feedSlice';
import { useSelector, useDispatch } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: [DONE] взять переменную из стора */
  const dispatch = useDispatch();
  // достаем данные ленты заказов из стора
  const data = useSelector(selectFeed);

  // при монтировании получаем с сервера актуальную ленту
  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  // если массив заказов пуст - показываем прелоадер
  if (!data.orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={data.orders}
      handleGetFeeds={() => {
        // на кнопку обновления снова получаем ленту с сервера
        dispatch(fetchFeeds());
      }}
    />
  );
};
