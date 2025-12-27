import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

// импортируем корневой редюсер
import { rootReducer } from './rootReducer';

// создаем стор приложения
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

// экспортируем тип состояние стора
export type RootState = ReturnType<typeof rootReducer>;
// экспортируем тип диспатча нашего стора
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
