import { MealType } from './meal-type.enum';

export type FoodDiaryItem = {
  caloriesCount: number;
  day: number;
  mealType: MealType;
}

export interface FoodDiaryInterface {
  id?: number;
  userId: number;
  diary: FoodDiaryItem[];
}
