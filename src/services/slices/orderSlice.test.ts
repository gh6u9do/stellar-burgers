import { expect, test, describe } from '@jest/globals';
import {
  orderSlice,
  createNewOrder,
  fetchUserOrders,
  fetchOrderByNumber,
  clearNewOrder,
  clearOrderByNumber
} from './orderSlice';
import { TOrder } from '@utils-types';

describe('orderSlice', () => {
  // достаем reducer
  const reducer = orderSlice.reducer;

  // создаем начальное состояние
  const initialState = {
    createdOrder: null,
    userOrders: [],
    orderByNumber: null,
    loading: false,
    error: null
  };

  // создаем фейковый заказ
  const fakeOrder: TOrder = {
    _id: '1',
    ingredients: ['bun', 'sauce'],
    status: 'done',
    name: 'Тестовый заказ',
    createdAt: '',
    updatedAt: '',
    number: 123
  };

  // ----------------------- createNewOrder ----------------------
  test('createNewOrder.pending - идет загрузка', () => {
    // записываем состояние после вызова экшена
    const state = reducer(initialState, createNewOrder.pending('', []));

    // проверяем что идет загрузка
    expect(state.loading).toBe(true);
    // проверяем что нет ошибок
    expect(state.error).toBe(null);
  });

  test('createNewOrder.fulfilled - заказ сохраняется', () => {
    // записываем состояние после вызова экшена
    const state = reducer(
      initialState,
      createNewOrder.fulfilled(fakeOrder, '', [])
    );

    // проверяем что загрузка закончилась
    expect(state.loading).toBe(false);
    // проверяем что заказ соответсвует положенному
    expect(state.createdOrder).toEqual(fakeOrder);
  });

  test('createNewOrder.rejected - ошибка записывается', () => {
    // записываем состояние
    const state = reducer(
      initialState,
      createNewOrder.rejected(null, '', [], 'Ошибка создания')
    );

    // проверяем что загрузка закончена
    expect(state.loading).toBe(false);
    // проверяем что ошибка сохранена
    expect(state.error).toBe('Ошибка создания');
  });

  // ----------------------- fetchUserOrders ------------------------
  test('fetchUserOrders.pending - идет загрузка', () => {
    // записываем состояние после вызова экшена
    const state = reducer(initialState, fetchUserOrders.pending('', undefined));

    // проверяем что идет загрузка
    expect(state.loading).toBe(true);
  });

  test('fetchUserOrders.fulfilled - пользовательские заказы записаны', () => {
    const state = reducer(
      initialState,
      fetchUserOrders.fulfilled([fakeOrder], '', undefined)
    );

    // проверяем что загрузка закончилась
    expect(state.loading).toBe(false);
    // проверяем что записанные заказы - те что мы положили
    expect(state.userOrders).toEqual([fakeOrder]);
  });

  test('fetchUserOrders.rejected - ошибка сохраняется', () => {
    const state = reducer(
      initialState,
      fetchUserOrders.rejected(null, '', undefined, 'Ошибка')
    );

    // проверяем что загрузка закончилась
    expect(state.loading).toBe(false);
    // проверяем текст ошибки
    expect(state.error).toBe('Ошибка');
  });

  // ----------------------- fetchOrderByNumber ------------------------
  test('fetchOrderByNumber.pending - идет загрузка', () => {
    // состояние после вызова экшена
    const state = reducer(initialState, fetchOrderByNumber.pending('', 123));

    // проверяем что идет загрузка
    expect(state.loading).toBe(true);
    // проверяем что ошибки нет
    expect(state.error).toBe(null);
  });

  test('fetchOrderByNumber.fulfilled - orderByNumber записывается', () => {
    const state = reducer(
      initialState,
      fetchOrderByNumber.fulfilled(fakeOrder, '', 123)
    );

    // проверяем что загрузка закончилась
    expect(state.loading).toBe(false);
    // проверяем полученный заказ
    expect(state.orderByNumber).toEqual(fakeOrder);
  });

  test('fetchOrderByNumber.rejected - ошибка сохраняетя', () => {
    const state = reducer(
      initialState,
      fetchOrderByNumber.rejected(null, '', 123, 'Ошибка')
    );

    // проверяем что загрузки нет
    expect(state.loading).toBe(false);
    // проверяем текст ошибки
    expect(state.error).toBe('Ошибка');
  });

  // --------------- обычные редюсеры ---------------
  test('clearNewOrder очищает createdOrder', () => {
    const state = reducer(
      { ...initialState, createdOrder: fakeOrder },
      clearNewOrder()
    );

    // проверяем что вместо заказа null
    expect(state.createdOrder).toBe(null);
  });

  test('clearOrderByNumber очищает orderByNumber', () => {
    const state = reducer(
      { ...initialState, orderByNumber: fakeOrder },
      clearOrderByNumber()
    );

    // проверяем что вместо заказа null
    expect(state.orderByNumber).toBe(null);
  });
});
