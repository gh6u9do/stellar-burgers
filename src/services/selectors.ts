import { RootState } from './store';

// селектор ингредиентов
export const selectIngredientsState = (state: RootState) => state.ingredients;

// селектор булочек и ингредиентов в конструкторе
export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor;

// селектор статуса авторизации юзера
export const selectIsUserAuth = (state: RootState) => state.user.isAuth;

// селектор статуса проверки авторизации юзера
export const selectIsAuthCheked = (state: RootState) => state.user.isAuthCheked;

// селектор пользовательских данных
export const selectUserData = (state: RootState) => state.user.userData;

// селектор всех данных в слайсе юзера
export const selectFullUserSlice = (state: RootState) => state.user;

// селектор всех данных из ленты заказов
export const selectFeed = (state: RootState) => state.feed;

// селектор статуса создаваемого заказа
export const selectOrderLoading = (state: RootState) => state.orders.loading;

// селектор данных созданного заказа
export const selectCreatedOrder = (state: RootState) =>
  state.orders.createdOrder;

// селектор заказа по номеру
export const selectOrderByNumber = (state: RootState) =>
  state.orders.orderByNumber;

// селектор пользовательских заказов
export const selectUserOrders = (state: RootState) => state.orders.userOrders;
