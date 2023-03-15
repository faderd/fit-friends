import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const';
import { AppData } from '../../types/state';

export const getInitialStateAppData = (): AppData => ({});

export const appData = createSlice({
  name: NameSpace.Data,
  initialState: getInitialStateAppData(),
  reducers: {},
});

export const { } = appData.actions;
