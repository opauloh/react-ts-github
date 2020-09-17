import { Reducer } from 'react';
import { IProfile } from '../components/Profile';

export const resultsState = {
  error: null,
  loading: true,
  profile: null
};

export interface ResultState {
  error?: string | null;
  loading?: boolean;
  profile: IProfile | null;
}

export type ResultAction =
  | { type: 'reset' }
  | { type: 'loading' }
  | { type: 'error'; error: string }
  | { type: 'success'; profile: IProfile };

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
