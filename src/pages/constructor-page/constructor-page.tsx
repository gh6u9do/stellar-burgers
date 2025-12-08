import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { selectIngredientsState } from '@selectors';

export const ConstructorPage: FC = () => {
  // достаем диспатч для отправки экшенов
  const dispatch = useDispatch();

  /** TODO: [DONE] взять переменную из стора */

  // достаем переменную загрузки ингредиентов
  const { loading, ingredients } = useSelector(selectIngredientsState);
  const isIngredientsLoading = loading;

  // кладем в стор результат запроса ингредиентов
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
