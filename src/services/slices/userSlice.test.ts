import { describe, test, expect } from '@jest/globals';
import {
  userSlice,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logoutUser,
  authCheked
} from './userSlice';
import { TUser } from '@utils-types';

describe('userSlice', () => {
  const reducer = userSlice.reducer;

  const initialState = {
    isAuthCheked: false,
    isAuth: false,
    userData: null,
    loading: false,
    error: undefined
  };

  const fakeUser: TUser = {
    email: 'test@test.ru',
    name: 'Uvan Petrovich'
  };

  // ------------------- registerUser -----------------
  test('registerUser.pending - идет загрузка', () => {
    const state = reducer(
      initialState,
      registerUser.pending('', { email: '', name: '', password: '' })
    );

    // проверяем что идет загрузка
    expect(state.loading).toBe(true);
    // проверяем что ошибки нет
    expect(state.error).toBe(undefined);
  });

  test('registerUser.fulfilled - пользователь регается', () => {
    const state = reducer(
      initialState,
      registerUser.fulfilled(fakeUser, '', {
        email: fakeUser.email,
        name: fakeUser.name,
        password: ''
      })
    );

    // проверяем что нет загрузки
    expect(state.loading).toBe(false);
    // проверяем что userData совпадает с тем что мы положили
    expect(state.userData).toEqual(fakeUser);
    // проверяем что пользователь авторизован
    expect(state.isAuth).toBe(true);
    // проверяем что авторизация проверена
    expect(state.isAuthCheked).toBe(true);
  });

  test('registerUser.rejected - ошибка сохраняется', () => {
    const state = reducer(
      initialState,
      registerUser.rejected(new Error('Ошибка'), '', {
        email: '',
        name: '',
        password: ''
      })
    );

    // проверяем что загрузки нет
    expect(state.loading).toBe(false);
    // проверяем что авторизации не получилось
    expect(state.isAuth).toBe(false);
    // проверяем что авторизация проверена
    expect(state.isAuthCheked).toBe(true);
    // проверяем текст ошибки
    expect(state.error).toBe('Ошибка');
  });

  // ------------------ loginUser ---------------------
  test('loginUser.pending - идет загрузка', () => {
    const state = reducer(
      initialState,
      loginUser.pending('', { email: '', password: '' })
    );

    // проверяем что идет загрузка
    expect(state.loading).toBe(true);
  });

  test('loginUser.fulfilled - пользователь залогинен', () => {
    const state = reducer(
      initialState,
      loginUser.fulfilled(fakeUser, '', { email: '', password: '' })
    );

    // проверяем что нет загрузки
    expect(state.loading).toBe(false);
    // проверяем что данные пользователя совпадают
    expect(state.userData).toEqual(fakeUser);
    // проверяем что пользователь авторизован
    expect(state.isAuth).toBe(true);
    // проверяем что авторизация проверена
    expect(state.isAuthCheked).toBe(true);
  });

  test('loginUser.rejected - ошибка сохраняется', () => {
    const state = reducer(
      initialState,
      loginUser.rejected(new Error('Ошибка'), '', { email: '', password: '' })
    );

    // проверяем что загрузки нет
    expect(state.loading).toBe(false);
    // проверяем что пользователь не авторизован
    expect(state.isAuth).toBe(false);
    // проверяем что авторизация проверена
    expect(state.isAuthCheked).toBe(true);
    // проверяем текст ошибки
    expect(state.error).toBe('Ошибка');
  });

  // --------------------------- getUser -----------------
  test('getUser.pending - идет загрузка', () => {
    const state = reducer(initialState, getUser.pending(''));

    // проверяем что идет загрузка
    expect(state.loading).toBe(true);
  });

  test('getUser.fulfilled - пользователь получен', () => {
    const state = reducer(initialState, getUser.fulfilled(fakeUser, ''));

    // проверяем что нет загрузки
    expect(state.loading).toBe(false);
    // проверяем что данные пользователя совпадают
    expect(state.userData).toEqual(fakeUser);
    // проверяем что пользователь авторизован
    expect(state.isAuth).toBe(true);
    // проверяем что авторизация проверена
    expect(state.isAuthCheked).toBe(true);
  });

  test('getUser.rejected - пользователь не авторизован', () => {
    const state = reducer(
      initialState,
      getUser.rejected(new Error('Ошибка'), '')
    );

    // проверяем что нет загрузки
    expect(state.loading).toBe(false);
    // проверяем что данных нет
    expect(state.userData).toBe(null);
    // проверяем что пользователь не авторизован
    expect(state.isAuth).toBe(false);
    // проверяем что авторизация проверена
    expect(state.isAuthCheked).toBe(true);
    expect(state.error).toBe('Ошибка');
  });

  // -------------------------- updateUser -----------------
  test('updateUser.pending - идет загрузка', () => {
    const state = reducer(initialState, updateUser.pending('', {}));

    // проверяем что идет загрузка
    expect(state.loading).toBe(true);
    // проверяем что нет ошибки
    expect(state.error).toBe(undefined);
  });

  test('updateUser.fulfilled - данные пользователя обновлены', () => {
    const state = reducer(
      initialState,
      updateUser.fulfilled(fakeUser, '', { name: 'New name' })
    );

    // проверяем что загрузки нет
    expect(state.loading).toBe(false);
    // проверяем что данные соотвествуют
    expect(state.userData).toEqual(fakeUser);
    // проверяем что пользователь авторизован
    expect(state.isAuth).toBe(true);
    // проверяем что авторизация проверена
    expect(state.isAuthCheked).toBe(true);
  });

  test('updateUser.rejected - обновление не получилось', () => {
    const state = reducer(
      initialState,
      updateUser.rejected(new Error('Ошибка'), '', {})
    );

    // проверяем что нет загрузки
    expect(state.loading).toBe(false);
    // проверяем что пользователь все еще авторизован
    expect(state.isAuth).toBe(true);
    // проверяем что авторизация проверена
    expect(state.isAuthCheked).toBe(true);
    // проверяем текст ошибки
    expect(state.error).toBe('Ошибка');
  });

  // ----------------------- logoutUser -------------------
  test('logoutUser.pending - идет загрузка', () => {
    const state = reducer(
      initialState,
      loginUser.pending('', { email: '', password: '' })
    );

    // проверяем что идет загрузка
    expect(state.loading).toBe(true);
    // проверяем что нет ошибки
    expect(state.error).toBe(undefined);
  });

  test('logoutUser.fulfilled - пользователь разлогинен', () => {
    const state = reducer(
      { ...initialState, isAuth: true, userData: fakeUser },
      logoutUser.fulfilled(null, '', undefined)
    );

    // проверяем что нет загрузки
    expect(state.loading).toBe(false);
    // проверяем что пользователь разлогинен
    expect(state.isAuth).toBe(false);
    // проверяем что нет данных
    expect(state.userData).toBe(null);
    // проверяем что авторизация проверена
    expect(state.isAuthCheked).toBe(true);
  });

  test('logoutUser.rejected - не удалось разлогиниться', () => {
    const state = reducer(
      { ...initialState, isAuth: true, userData: fakeUser },
      logoutUser.rejected(new Error('Ошибка'), '')
    );

    // проверяем что нет загрузки
    expect(state.loading).toBe(false);
    // провряем что все еще залогинен
    expect(state.isAuth).toBe(true);
    // проверяем что чекнули авторизацию
    expect(state.isAuthCheked).toBe(true);
    // проверяем текст ошибки
    expect(state.error).toBe('Ошибка');
  });

  // ------------- обычный reducer -----------
  test('authCheked - выставляет флаг проверки авторизации', () => {
    const state = reducer(initialState, authCheked());

    // проверяем что проверка пройдена
    expect(state.isAuthCheked).toBe(true);
  });
});
