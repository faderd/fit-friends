import { GymInterface, OrderInterface, ReviewInterface, TrainingInterface } from '@fit-friends/shared-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { AppData } from '../../types/state';
import { submitNewTraining, fetchTrainings, updateTraining, submitNewReview, submitNewOrder, fetchTraining, fetchGym } from '../api-actions';
import { CoachOrdersInfo } from '../../types/coach-orders-info';

export const getInitialStateAppData = (): AppData => ({
  isDataLoaded: true,
  trainings: [],
  training: null,
  reviews: [],
  gyms: [],
  gym: null,
  orders: [],
  coachOrdersInfo: [],
});

export const appData = createSlice({
  name: NameSpace.Data,
  initialState: getInitialStateAppData(),
  reducers: {
    storeIsDataLoadedStatus: (state, action: PayloadAction<boolean>) => {
      state.isDataLoaded = action.payload;
    },
    storeTraining: (state, action: PayloadAction<TrainingInterface>) => {
      state.trainings = [...state.trainings, action.payload];
    },
    storeTrainings: (state, action: PayloadAction<TrainingInterface[]>) => {
      state.trainings = action.payload;
    },
    storeReviews: (state, action: PayloadAction<ReviewInterface[]>) => {
      state.reviews = action.payload;
    },
    storeGyms: (state, action: PayloadAction<GymInterface[]>) => {
      state.gyms = action.payload;
    },
    storeOrders: (state, action: PayloadAction<OrderInterface[]>) => {
      state.orders = action.payload;
    },
    storeCoachOrdersInfo: (state, action: PayloadAction<CoachOrdersInfo[]>) => {
      state.coachOrdersInfo = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTrainings.fulfilled, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchTrainings.rejected, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchTrainings.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchTraining.fulfilled, (state, action: PayloadAction<TrainingInterface>) => {
        state.training = action.payload;
        state.isDataLoaded = true;
      })
      .addCase(fetchTraining.rejected, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchTraining.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(submitNewTraining.fulfilled, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(submitNewTraining.rejected, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(submitNewTraining.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(updateTraining.fulfilled, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(updateTraining.rejected, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(updateTraining.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(submitNewReview.fulfilled, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(submitNewReview.rejected, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(submitNewReview.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(submitNewOrder.fulfilled, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(submitNewOrder.rejected, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(submitNewOrder.pending, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchGym.fulfilled, (state, action: PayloadAction<GymInterface>) => {
        state.gym = action.payload;
        state.isDataLoaded = true;
      })
      .addCase(fetchGym.rejected, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchGym.pending, (state) => {
        state.isDataLoaded = false;
      })
  }
});

export const { storeIsDataLoadedStatus, storeTraining, storeTrainings, storeReviews, storeGyms, storeOrders, storeCoachOrdersInfo } = appData.actions;
