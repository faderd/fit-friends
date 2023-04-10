import { OrderInterface, OrderType } from '@fit-friends/shared-types';
import GymCatalogItem from '../gym-catalog-item/gym-catalog-item';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import TrainingItem from '../training-item/training-item';
import { fetchGym, fetchTraining } from '../../store/api-actions';
import { getGym, getTraining } from '../../store/app-data/selectors';

type PurchasesItemProps = {
  order: OrderInterface;
}

function PurchasesItem({ order }: PurchasesItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const training = useAppSelector(getTraining);
  const gym = useAppSelector(getGym);

  useEffect(() => {
    if (order.type === OrderType.Training) {
      dispatch(fetchTraining(order.entityId));
    }
  }, [dispatch, order.entityId, order.type]);

  useEffect(() => {
    if (order.type === OrderType.Subscription) {
      dispatch(fetchGym(order.entityId));
    }
  }, [dispatch, order.entityId, order.type]);

  const getMarkup = (order: OrderInterface): JSX.Element => {

    if (order.type === OrderType.Subscription && gym !== null) {
      return (
        <GymCatalogItem
          gym={gym}
          itemClassName='my-purchases__item'
        />
      );
    }

    if (order.type === OrderType.Training && training !== null) {
      return (
        <TrainingItem
          training={training}
          liClassName='my-purchases__item' />
      );
    }

    return (
      <>
      </>
    );
  };

  return (getMarkup(order));
}

export default PurchasesItem;
