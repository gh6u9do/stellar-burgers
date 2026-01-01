import { expect, test, describe } from '@jest/globals';
import { feedSlice, fetchFeeds } from './feedSlice';
import { TOrder } from '@utils-types';

describe('feedSlice', () => {
  // достаем reducer
  const reducer = feedSlice.reducer;

  // создаем initialState
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  test('pending - идет загрузка и нет ошибок', () => {
    // получаем новое состояние после вызова экшена
    const state = reducer(initialState, fetchFeeds.pending('', undefined));

    // проверяем что идет загрузка
    expect(state.loading).toBe(true);
    // проверяем что нет ошибок
    expect(state.error).toBe(null);
  });

  test('fulfilled - заказы записываются, загрузка - false', () => {
    // создаем фейковый объект, возвращаемый сервером
    const fakeFeedResponse = {
      orders: [
        {
          _id: '1',
          ingredients: ['bun', 'cheese'],
          status: 'done',
          name: 'Вкусный бургер',
          createdAt: '',
          updatedAt: '',
          number: 1
        }
      ] as TOrder[],
      total: 100,
      totalToday: 100,
      success: true
    };

    // записываем новое состояние после вызова экшена
    const state = reducer(
      initialState,
      fetchFeeds.fulfilled(fakeFeedResponse, '')
    );

    // проверяем что загрузка прекратилась
    expect(state.loading).toBe(false);
    // проверяем что заказы ровно такие какие мы передали
    expect(state.orders).toEqual(fakeFeedResponse.orders);
    // проверяем что всего заказов столько сколько мы передали
    expect(state.total).toBe(fakeFeedResponse.total);
    // проверяем что сегодняшних заказов столько сколько мы передали
    expect(state.totalToday).toBe(fakeFeedResponse.totalToday);
  });

  test('rejected - ошибка записывается, загрузки нет', () => {
    // записываем новое состояние после вызова экшена
    const state = reducer(
      initialState,
      fetchFeeds.rejected(new Error('Ошибка :('), '')
    );

    // проверяем что загрузка прекратилась
    expect(state.loading).toBe(false);
    // проверяем что ошибка равна переданной
    expect(state.error).toBe('Ошибка :(');
  });
});
