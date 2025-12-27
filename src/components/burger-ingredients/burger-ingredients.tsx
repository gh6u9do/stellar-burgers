import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { TIngredient, TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useSelector } from '../../services/store';
import { selectIngredientsState } from '@selectors';

export const BurgerIngredients: FC = () => {
  /** TODO: [DONE] взять переменные из стора */

  // достаем все ингредиенты из стора
  const ingredients = useSelector(selectIngredientsState);

  // достаем булочки из ингредиентов
  const buns: TIngredient[] = ingredients.ingredients.filter(
    (ingredient) => ingredient.type === 'bun'
  );

  // достаем начинки из ингредиентов
  const mains: TIngredient[] = ingredients.ingredients.filter(
    (ingredient) => ingredient.type === 'main'
  );

  // достаем соусы из игредиентов
  const sauces: TIngredient[] = ingredients.ingredients.filter(
    (ingredient) => ingredient.type === 'sauce'
  );

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  // обрабатываем клик по табу
  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // дефолтная строка!!!
  // return null;

  // если в ингредиентах пусто - возвращаем null
  if (!buns.length && !mains.length && !sauces.length) {
    return null;
  }

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
