import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

// создаем тип для начального состояния
type TInitialState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

// описываем начальное состояние
const initialState: TInitialState = {
  ingredients: [],
  loading: false,
  error: null
};

// описываем asyncThunk для получения данных с сервера
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    // достаем данные
    const data = await getIngredientsApi();
    return data;
  }
);

// описываем сам слайс ингредиентов
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {},

  // описываем внешние редюсеры
  extraReducers: (builder) => {
    // здесь описываем 3 кейса
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload as TIngredient[];
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      });
  }
});
