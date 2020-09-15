import { Reducer } from 'react';
import { IProfile } from '../components/Profile';

export const resultsState = {
  error: null,
  loading: true,
  profile: null
};

type State = {
  error?: string | null;
  loading?: boolean;
  profile: IProfile | null;
};

type Action =
  | { type: 'loading' }
  | { type: 'error'; error: string }
  | { type: 'success'; profile: IProfile };

export const resultsReducer: Reducer<State, Action> = (
  state: State,
  action: Action
) => {
  switch (action.type) {
    case 'loading':
      return { ...state, loading: true };
    case 'error':
      return { ...state, error: action.error, loading: false };
    case 'success':
      return { ...state, profile: action.profile, error: null, loading: false };
  }
};
