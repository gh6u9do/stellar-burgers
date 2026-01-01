import { ingredientsSlice, fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '@utils-types';
import { expect, test, describe } from '@jest/globals';

describe('ingredientsSlice', () => {
  // достаем редюсер
  const reducer = ingredientsSlice.reducer;

  // записываем начальное состояние
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  test('pending, записано что идет загрузка и нет ошибок', () => {
    // получаем новое состояние после вызова экшена
    const state = reducer(
      initialState,
      fetchIngredients.pending('', undefined)
    );

    // проверяем что идет загрузка
    expect(state.loading).toBe(true);
    // проверяем что ошибки == null
    expect(state.error).toBe(null);
  });

  test('fulfilled - ингредиенты записываются, загрузка - false', () => {
    // создаем массив тестовых ингредиентов
    const testIngredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Булочка',
        type: 'bun',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 10,
        price: 20,
        image: '',
        image_large: '',
        image_mobile: ''
      },
      {
        _id: '2',
        name: 'Соус',
        type: 'sauce',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 10,
        price: 20,
        image: '',
        image_large: '',
        image_mobile: ''
      }
    ];

    // записываем состояние после вызова экшена
    const state = reducer(
      initialState,
      fetchIngredients.fulfilled(testIngredients, '')
    );

    // проверяем что загрузка прекратилась
    expect(state.loading).toBe(false);
    // проверяем что в ингредиенты записано ровно то что мы туда положили
    expect(state.ingredients).toEqual(testIngredients);
  });

  test('rejected - ошибка записывается, загрузка - false', () => {
    // записываем состояние после вызова экшена
    const state = reducer(
      initialState,
      fetchIngredients.rejected(new Error('Ошибка :('), '')
    );

    // проверяем что ошибка записалась
    expect(state.error).toBe('Ошибка :(');
    // проверяем что загрузка прекратилась
    expect(state.loading).toBe(false);
  });
});
