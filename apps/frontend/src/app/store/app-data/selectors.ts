import { NameSpace } from '../../../const';
import { State } from '../../types/state';

export const getIsDataLoaded = (state: State) => state[NameSpace.Data].isDataLoaded;
