import { TrainingInterface } from '@fit-friends/shared-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { AppData } from '../../types/state';
import { createTraining, fetchTrainings } from '../api-actions';

export const getInitialStateAppData = (): AppData => ({
  isDataLoaded: true,
  trainings: [],
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
      .addCase(createTraining.fulfilled, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(createTraining.rejected, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(createTraining.pending, (state) => {
        state.isDataLoaded = false;
      })
  }
});

export const { storeIsDataLoadedStatus, storeTraining, storeTrainings } = appData.actions;
