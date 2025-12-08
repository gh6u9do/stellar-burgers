import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TInitialState = {
  createdOrder: TOrder | null;
  userOrders: TOrder[];
  orderByNumber: TOrder | null;
  loading: boolean;
  error: string | null;
};

// создаем начальное состояние
const initialState: TInitialState = {
  createdOrder: null,
  userOrders: [],
  orderByNumber: null,
  loading: false,
  error: null
};

//  экшен для создания нового заказа
export const createNewOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredientsId: string[], { rejectWithValue }) => {
    try {
      // получаем данные с сервера
      const data = await orderBurgerApi(ingredientsId);
      return data.order;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка создания');
    }
  }
);

// экшен для получения заказов текущего пользователя
export const fetchUserOrders = createAsyncThunk(
  'order/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      // получаем заказы с сервера
      const data = await getOrdersApi();
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.message || 'Ошибка получения пользовательских заказов'
      );
    }
  }
);

// экшен для получения заказа по номеру
export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchOrderByNumber',
  async (orderNumber: number, { rejectWithValue }) => {
    try {
      const data = await getOrderByNumberApi(orderNumber);
      return data.orders[0];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Заказ по номеру не найден');
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // очистить новый заказ
    clearNewOrder: (state) => {
      state.createdOrder = null;
    },
    clearOrderByNumber: (state) => {
      state.orderByNumber = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // создание заказа
      .addCase(createNewOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.createdOrder = action.payload;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // получение всех пользовательских заказов
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // получение заказа по номеру
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orderByNumber = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearNewOrder, clearOrderByNumber } = orderSlice.actions;
