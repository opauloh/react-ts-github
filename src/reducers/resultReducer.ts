import { Reducer } from 'react';
import { Profile } from '../api';

export const resultsState = {
  error: null,
  loading: true,
  profile: null
};

export interface ResultState {
  error?: string | null;
  loading?: boolean;
  profile: Profile | null;
}

export type ResultAction =
  | { type: 'reset' }
  | { type: 'loading' }
  | { type: 'error'; error: string }
  | { type: 'success'; profile: Profile };

export const resultsReducer: Reducer<ResultState, ResultAction> = (
  state: ResultState,
  action: ResultAction
) => {
  switch (action.type) {
    case 'reset':
      return resultsState;
    case 'loading':
      return { ...state, loading: true };
    case 'error':
      return { ...state, error: action.error, loading: false, profile: null };
    case 'success':
      return { ...state, profile: action.profile, error: null, loading: false };
  }
};
