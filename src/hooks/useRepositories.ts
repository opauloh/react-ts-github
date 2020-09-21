import { Dispatch, useContext, useEffect, useReducer } from 'react';
import { getRepositories } from '../api';
import UserContext from '../contexts/userContext';
import {
  repositoriesReducer,
  repositoriesState
} from '../reducers/repositoriesReducer';
import { ResultAction, ResultState } from '../reducers/resultReducer';

const useRepositories = () => {
  const [{ profile }]: [ResultState, Dispatch<ResultAction>] = useContext(
    UserContext
  );

  const [
    { error, repositories, loading, sorting, cursor },
    dispatch
  ] = useReducer(repositoriesReducer, repositoriesState);

  useEffect(() => {
    dispatch({ type: 'reset' });
  }, [profile]);

  useEffect(() => {
    if (profile) {
      dispatch({ type: 'loading' });
      getRepositories(profile.login, sorting, cursor)
        .then((repositories) => dispatch({ type: 'success', repositories }))
        .catch(({ message }) => dispatch({ type: 'error', error: message }));
    }
  }, [profile, sorting, cursor]);

  return {
    profile,
    error,
    repositories,
    loading,
    sorting,
    sort: () => dispatch({ type: 'sorting' }),
    loadMore: () =>
      dispatch({
        type: 'load_more',
        cursor: repositories[repositories.length - 1].cursor
      })
  };
};

export default useRepositories;
