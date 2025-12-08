import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { authCheked, getUser } from '../../services/slices/userSlice';
import { getCookie } from '../../utils/cookie';

const App = () => {
  // достаем функцию для навигации
  const navigate = useNavigate();
  // достаем текущую локацию с помощью хука
  const location = useLocation();
  // достаем возможный переданный стейт из объекта локации
  const backgroundLocation = location.state?.background;

  const dispatch = useDispatch();

  // эффект для проверки залогинен ли юзер
  useEffect(() => {
    // достаем актуальный accessToken
    const accessToken = getCookie('accessToken');
    // чекаем есть ли вообще access токен
    if (accessToken) {
      // если есть то вызываем экшен получения инфы юзера
      dispatch(getUser());
    } else {
      // указываем что проверку совершили
      dispatch(authCheked());
    }
  }, [dispatch]);

  function closeModal() {
    navigate(-1);
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      {/* указываем переданный location из стейта и стандартный по дефолту */}
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* модальные окна */}
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title=''
                onClose={() => {
                  closeModal();
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title=''
                onClose={() => {
                  closeModal();
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title=''
                  onClose={() => {
                    closeModal();
                  }}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
