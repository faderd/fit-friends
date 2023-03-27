import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { AppData } from '../../types/state';

export const getInitialStateAppData = (): AppData => ({
  isDataLoaded: true,
});

export const appData = createSlice({
  name: NameSpace.Data,
  initialState: getInitialStateAppData(),
  reducers: {
    storeIsDataLoadedStatus: (state, action: PayloadAction<boolean>) => {
      state.isDataLoaded = action.payload;
    },
  },
});

export const { storeIsDataLoadedStatus } = appData.actions;
