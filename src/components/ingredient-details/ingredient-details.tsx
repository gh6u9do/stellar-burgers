import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIngredientsState } from '@selectors';

export const IngredientDetails: FC = () => {
  // извлекаем id ингредиента из url
  const { id } = useParams();
  /** TODO: [DONE] взять переменную из стора */
  const data = useSelector(selectIngredientsState);
  const ingredientData = data.ingredients.find((i) => i._id === id) || null;

  if (!ingredientData) {
    console.log('ингредиент не найден');
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
