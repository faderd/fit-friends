import { OrderSortType, TrainingInterface } from '@fit-friends/shared-types';

export const getTrainingBackground = () => {
  const min = 1;
  const max = 12;
  const number = Math.floor(Math.random() * (max - min + 1)) + min;
  const stringNumber = number <= 9
    ? '0' + number.toString()
    : number.toString()

  return `img/content/thumbnails/training-${stringNumber}`;
};

export const getSortedOrdersInfo = (sortType: OrderSortType, sortDirection: 'desc' | 'asc', coachOrdersInfo: { training: TrainingInterface, trainingsCount: number, price: number }[]) => {
  if (sortType === OrderSortType.Price) {
    return coachOrdersInfo.sort((a, b) =>
      sortDirection === 'asc'
        ? a.price - b.price
        : b.price - a.price);
  } else if (sortType === OrderSortType.Default) {
    return coachOrdersInfo.sort((a, b) =>
      sortDirection === 'asc'
        ? a.trainingsCount - b.trainingsCount
        : b.trainingsCount - a.trainingsCount);
  }
};
