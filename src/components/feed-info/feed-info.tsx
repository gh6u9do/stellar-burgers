import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

import { useSelector } from '../../services/store';
import { selectFeed } from '@selectors';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: [DONE] взять переменные из стора */
  // достаем весь слайс feed
  const feed = useSelector(selectFeed);
  // достаем только заказы из feed
  const orders: TOrder[] = feed.orders || [];

  // готовые
  const readyOrders = getOrders(orders, 'done');

  // в работе
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
