import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

// типизируем начальное состояние слайса
type TInitialState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};

// описываем начальное состояние слайса
const initialState: TInitialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

// делаем asyncThunk для получения заказов с сервера
export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', async () => {
  // получаем данные с сервера
  const data = await getFeedsApi();
  return data;
});

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload?.orders;
        state.total = action.payload?.total;
        state.totalToday = action.payload?.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  }
});
