import React, { Dispatch } from 'react';
import {
  ResultAction,
  resultsState,
  ResultState
} from '../reducers/resultReducer';

const UserContext = React.createContext<[ResultState, Dispatch<ResultAction>]>([
  resultsState,
  () => ({})
]);

export default UserContext;
