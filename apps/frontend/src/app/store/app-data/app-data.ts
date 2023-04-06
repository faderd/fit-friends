import { ReviewInterface, TrainingInterface } from '@fit-friends/shared-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { AppData } from '../../types/state';
import { submitNewTraining, fetchTrainings, updateTraining, submitNewReview } from '../api-actions';

export const getInitialStateAppData = (): AppData => ({
  isDataLoaded: true,
  trainings: [],
  reviews: [],
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
    }
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
  }
});

export const { storeIsDataLoadedStatus, storeTraining, storeTrainings, storeReviews } = appData.actions;
