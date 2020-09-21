import React, { Dispatch, FC, useContext, useEffect, useReducer } from 'react';
import { getRepositories } from '../api';
import UserContext from '../contexts/userContext';
import {
  repositoriesReducer,
  repositoriesState
} from '../reducers/repositoriesReducer';
import { ResultAction, ResultState } from '../reducers/resultReducer';
import Button from './Button';
import Loading from './Loading';
import styles from './Repositories.module.css';
import Repository from './RepositoryItem';
import Title from './Title';

const Repositories: FC = () => {
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

  if (!profile) return <></>;
  if (!repositories) return <>empty</>;
  if (error) return <>error</>;

  return (
    <div className={styles.repositories}>
      <div className={styles.header}>
        <Title>
          Showing {repositories.length} Repositories out of{' '}
          {profile.repositories.totalCount}{' '}
        </Title>
        <div>
          <Button onClick={() => dispatch({ type: 'sorting' })}>
            Sorting name: {sorting}
          </Button>
        </div>
      </div>
      {repositories.map((repository) => (
        <Repository key={repository.node.id} repository={repository.node} />
      ))}
      <div>
        {loading && <Loading text="Loading Repositories" />}
        {repositories.length < profile.repositories.totalCount && (
          <Button
            onClick={() =>
              dispatch({
                type: 'load_more',
                cursor: repositories[repositories.length - 1].cursor
              })
            }>
            Load More
          </Button>
        )}
      </div>
    </div>
  );
};

export default Repositories;
