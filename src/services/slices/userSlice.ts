import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie } from '../../utils/cookie';

// тип для initialState
type TInitialState = {
  isAuthCheked: boolean; // означает проверили ли аутентификацию юзера
  isAuth: boolean; // означает авторизован ли юзер в данный момент
  userData: TUser | null;
  loading: boolean;
  error: string | undefined;
};

// создаем начальное состояние
const initialState: TInitialState = {
  isAuthCheked: false,
  isAuth: false,
  userData: null,
  loading: false,
  error: undefined
};

// асинхронный экшен для регистрации пользователя
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    try {
      // отправляем запрос на регистрацию
      const res = await registerUserApi(data);

      // записываем  access token в куки
      setCookie('accessToken', res.accessToken);

      // записываем refresh token в local storage
      localStorage.setItem('refreshToken', res.refreshToken);

      return res.user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);

// асинхронный экшен для логина пользователя
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    try {
      // отправляем запрос логин
      const res = await loginUserApi(data);

      // записываем access токен
      setCookie('accessToken', res.accessToken);

      // записываем refresh token
      localStorage.setItem('refreshToken', res.refreshToken);

      return res.user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);

// асинхронный экшен для автоматический проверки юзера при старте
export const getUser = createAsyncThunk('user/getUser', async () => {
  try {
    // получаем информацию о юзере
    const res = await getUserApi();
    return res.user;
  } catch (error) {
    console.log(error);
    return null;
  }
});

// асинхронный экшен для обновления профиля
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => {
    try {
      // обновляем данные на сервере
      const res = await updateUserApi(data);
      return res.user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);

// экшен для разлогинивания пользователя
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  try {
    // отправляем запрос на сервер
    const res = await logoutApi();
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // экшен аутентификации пользователя
    authCheked: (state) => {
      state.isAuthCheked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      // этапы регистрации
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = false;
        state.isAuthCheked = true;
        state.isAuth = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuth = false;
        state.isAuthCheked = true;
        state.error = action.error.message;
      })

      // этапы логина
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.isAuthCheked = true;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuth = false;
        state.isAuthCheked = true;
        state.error = action.error.message;
      })

      // этапы авто логина
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthCheked = true;
        state.userData = action.payload;
        state.isAuth = Boolean(action.payload);
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.userData = null;
        state.isAuthCheked = true;
        state.isAuth = false;
        state.error = action.error.message;
      })

      // этапы обновления пользовательских данных
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthCheked = true;
        state.isAuth = true;
        state.userData = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.isAuthCheked = true;
        state.error = action.error.message;
      })

      // этапы разлогинивания пользователя
      .addCase(logoutUser.pending, (state, action) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthCheked = true;
        state.isAuth = false;
        state.userData = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthCheked = true;
        state.isAuth = true;
        state.error = action.error.message;
      });
  }
});

export const { authCheked } = userSlice.actions;
