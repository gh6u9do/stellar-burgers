import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { useDispatch } from '../store';
import { clearConstructor } from './constructorSlice';

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
export const createNewOrder = createAsyncThunk<
  TOrder, // что возвращаем
  string[], // аргумент
  { rejectValue: string } // что в reject
>(
  'order/createOrder',
  async (ingredientsId: string[], { dispatch, rejectWithValue }) => {
    try {
      // получаем данные с сервера
      const data = await orderBurgerApi(ingredientsId);
      // очищаем конструктор при успешном создании заказа
      dispatch(clearConstructor());
      return data.order;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('ошибка создания заказа');
    }
  }
);

// экшен для получения заказов текущего пользователя
export const fetchUserOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('order/fetchUserOrders', async (_, { rejectWithValue }) => {
  try {
    // получаем заказы с сервера
    const data = await getOrdersApi();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue('ошибка получения пользовательских заказов');
    }
  }
});

// экшен для получения заказа по номеру
export const fetchOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>(
  'order/fetchOrderByNumber',
  async (orderNumber: number, { rejectWithValue }) => {
    try {
      const data = await getOrderByNumberApi(orderNumber);
      return data.orders[0];
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('ошибка получения заказа по номеру');
      }
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
        state.error = action.payload ?? null;
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
        state.error = action.payload ?? null;
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
        state.error = action.payload ?? null;
      });
  }
});

export const { clearNewOrder, clearOrderByNumber } = orderSlice.actions;
