import { MealType } from './meal-type.enum';

export type FoodDiaryItem = {
  caloriesCount: number;
  date: Date;
  mealType: MealType;
}

export interface FoodDiaryInterface {
  id?: number;
  userId: number;
  diary: FoodDiaryItem[];
}
