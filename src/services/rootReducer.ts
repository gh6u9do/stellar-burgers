import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { constructorSlice } from './slices/constructorSlice';
import { userSlice } from './slices/userSlice';
import { feedSlice } from './slices/feedSlice';
import { orderSlice } from './slices/orderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: constructorSlice.reducer,
  user: userSlice.reducer,
  feed: feedSlice.reducer,
  orders: orderSlice.reducer
});
