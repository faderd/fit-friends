export type trainingsFilters = {
  searchParamMinPrice: string | null;
  searchParamMaxPrice: string | null;
  searchParamMinCalories: string | null;
  searchParamMaxCalories: string | null;
  searchParamMinRate: string | null;
  searchParamMaxRate: string | null;
  searchParamTrainingDuration: string | string[] | null;
  searchParamTrainingType: string | string[] | null;
  sortingType: string | null;
}
