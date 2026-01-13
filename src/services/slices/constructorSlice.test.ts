import { expect, test, describe } from '@jest/globals';
import {
  constructorSlice,
  addIngredient,
  removeIngredient,
  addBun,
  moveIngredient
} from './constructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

/*
    todo: проверить редюсер слайса burgerConstructor: 
        - обработку экшена добавления ингредиента
        - обработку экшена удаления ингредиента
        - обработку экшена изменения порядка ингредиентов в начинке 
*/

describe('constructorSlice', () => {
  // достаем сам reducer
  const reducer = constructorSlice.reducer;

  test('экшен добавления ингредиента работает корректно', () => {
    // создаем начальное состояние, для передачи в редюсер
    const initialState = {
      bun: null,
      ingredients: []
    };

    // создаем тестовый ингредиент, который будем добавлять в стейт
    const testIngredient: TIngredient = {
      _id: '99999999',
      name: 'Sauce curry',
      type: 'sauce',
      proteins: 10,
      fat: 11,
      carbohydrates: 12,
      calories: 13,
      price: 50,
      image: '',
      image_large: '',
      image_mobile: ''
    };

    // записываем состояние после добавления ингредиента
    const state = reducer(initialState, addIngredient(testIngredient));

    // проверяем что в стейт ингредиента записан элемент
    expect(state.ingredients).toHaveLength(1);
    // проверяем что данные ингредиента в стейте соответствуют тем что мы положили
    expect(state.ingredients[0]).toMatchObject({ ...testIngredient });
    // проверяем что поле с id ингредиента существует и не пустое
    expect(state.ingredients[0].id).toEqual(expect.any(String));
  });

  test('добавление булочки работает корректно', () => {
    // создаем начальное состояние
    const inititalState = {
      bun: null,
      ingredients: []
    };

    // создаем тестовую булочку, которую будем класть в стейт
    const testBun: TIngredient = {
      _id: '5454',
      name: 'Just bun',
      type: 'bun',
      proteins: 10,
      fat: 11,
      carbohydrates: 12,
      calories: 13,
      price: 50,
      image: '',
      image_large: '',
      image_mobile: ''
    };

    // записываем состояние после добавления булочки
    const state = reducer(inititalState, addBun(testBun));

    // проверяем что в стейте теперь записана одна булочка
    expect(state.bun).toEqual(testBun);
  });

  test('удаление ингредиента работает корректно', () => {
    // создаем тестовые ингредиенты
    const testIngredient1 = {
      _id: '1',
      name: 'Соус',
      type: 'sauce',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 10,
      price: 20,
      image: '',
      image_large: '',
      image_mobile: '',
      id: 'id-1'
    };

    const testIngredient2 = {
      _id: '2',
      name: 'Котлета',
      type: 'main',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 10,
      price: 20,
      image: '',
      image_large: '',
      image_mobile: '',
      id: 'id-2'
    };

    // создаем стейт с ингредиентами
    const initialState = {
      bun: null,
      ingredients: [testIngredient1, testIngredient2]
    };

    // записываем стейт после удаления ингредиента
    const state = reducer(initialState, removeIngredient('id-2'));

    // проверяем что длина после удаления равна 1
    expect(state.ingredients).toHaveLength(1);
    // проверяем что id оставшегося элемента равно 1
    expect(state.ingredients[0].id).toBe('id-1');
  });

  test('изменение положения ингредиента работает корректно', () => {
    // создаем тестовые ингредиенты
    const testIngredient1 = {
      _id: '1',
      name: 'Котлета',
      type: 'main',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 10,
      price: 20,
      image: '',
      image_large: '',
      image_mobile: '',
      id: 'id-1'
    };
    const testIngredient2 = {
      _id: '2',
      name: 'Котлета',
      type: 'main',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 10,
      price: 20,
      image: '',
      image_large: '',
      image_mobile: '',
      id: 'id-2'
    };
    const testIngredient3 = {
      _id: '3',
      name: 'Котлета',
      type: 'main',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 10,
      price: 20,
      image: '',
      image_large: '',
      image_mobile: '',
      id: 'id-3'
    };

    // задаем initialState
    const initialState = {
      bun: null,
      ingredients: [testIngredient1, testIngredient2, testIngredient3]
    };

    // записываем значение стейта после изменения позиции
    const state = reducer(
      initialState,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    // проверяем что элементы теперь в другом порядке
    expect(state.ingredients[0]._id).toBe('2');
    expect(state.ingredients[1]._id).toBe('1');
  });
});
