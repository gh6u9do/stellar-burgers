import { expect, test, describe } from '@jest/globals';
import { rootReducer } from '../rootReducer';

describe('rootReducer', () => {
  test('rootReducer корректно инициализировался', () => {
    // создаем стейт (первый аргумент - undefined, чтобы он вернул initial state, второй аргумент - фиктивный экшен)
    const state = rootReducer(undefined, { type: 'UNKNOW_ACTION' });

    // сравниваем стейт
    expect(state).toEqual({
      ingredients: {
        ingredients: [],
        loading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      user: {
        isAuthCheked: false,
        isAuth: false,
        userData: null,
        loading: false,
        error: undefined
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        loading: false,
        error: null
      },
      orders: {
        createdOrder: null,
        userOrders: [],
        orderByNumber: null,
        loading: false,
        error: null
      }
    });
  });
});
