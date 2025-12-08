import { TConstructorIngredient, TIngredient } from './../../utils/types';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

// тип для начального значения в слайсе
type TInitialState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

// создаем само начальное состояние для бургера в конструкторе
const initialState: TInitialState = {
  bun: null,
  ingredients: []
};

// создаем слайс для конструктора бургера
export const constructorSlice = createSlice({
  name: 'constructor',
  initialState: initialState,
  reducers: {
    // Экшен для добавления булки
    addBun: (state, action: PayloadAction<TIngredient>) => {
      // Проверяем что это действительно булка
      if (action.payload.type !== 'bun') {
        return;
      }
      state.bun = action.payload;
    },

    // Экшен для добавления ингредиента
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        // Проверяем что это НЕ булка
        if (action.payload.type === 'bun') {
          console.warn('addIngredient: нельзя добавлять bun через этот экшен');
          return;
        }
        state.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => {
        // Гарантируем что это не булка
        if (ingredient.type === 'bun') {
          throw new Error('Используйте addBun для добавления булки');
        }
        return {
          payload: {
            ...ingredient,
            id: nanoid()
          } as TConstructorIngredient
        };
      }
    },

    // удаление ингредиента
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },

    // очистка всего конструктора
    clearConstructor: (state) => {
      // задаем дефолтные значения
      state.bun = null;
      state.ingredients = [];
    }
  }
});

// экспортируем экшены
export const { addBun, addIngredient, removeIngredient, clearConstructor } =
  constructorSlice.actions;
