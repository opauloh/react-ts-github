import { Reducer } from 'react';
import { IRepositories } from '../components/Repositories';

type State = {
  error?: ErrorMessage;
  loading?: boolean;
  repositories: IRepositories[];
  sorting: Sorting;
  cursor: Cursor;
};

export const repositoriesState: State = {
  error: null,
  loading: true,
  repositories: [],
  sorting: 'ASC',
  cursor: null
};

type Action =
  | { type: 'reset' }
  | { type: 'loading' }
  | { type: 'error'; error: ErrorMessage }
  | { type: 'success'; repositories: IRepositories[] }
  | { type: 'load_more'; cursor: Cursor }
  | { type: 'sorting' };

export const repositoriesReducer: Reducer<State, Action> = (
  state: State,
  action: Action
) => {
  switch (action.type) {
    case 'reset':
      return repositoriesState;
    case 'loading':
      return { ...state, loading: true };
    case 'sorting':
      return {
        ...state,
        sorting: state.sorting === 'ASC' ? 'DESC' : 'ASC',
        repositories: [],
        cursor: null
      };
    case 'load_more':
      return { ...state, cursor: action.cursor };
    case 'error':
      return { ...state, error: action.error, loading: false };
    case 'success':
      return {
        ...state,
        repositories: state.repositories.concat(action.repositories),
        error: null,
        loading: false
      };
  }
};
