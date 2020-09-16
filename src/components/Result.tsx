import React, { FC, useEffect, useReducer } from 'react';
import { resultsReducer, resultsState } from '../reducers/resultReducer';
import { getProfile } from '../utils/graphql';
import Profile from './Profile';
import styles from './Result.module.css';

type Props = {
  username: string;
};

const Result: FC<Props> = ({ username }) => {
  const [{ error, profile, loading }, dispatch] = useReducer(
    resultsReducer,
    resultsState
  );

  useEffect(() => {
    dispatch({ type: 'loading' });
    getProfile(username)
      .then((profile) => dispatch({ type: 'success', profile }))
      .catch(({ message }) => dispatch({ type: 'error', error: message }));
  }, [username]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div className={styles.error}>{error}</div>;

  return <div>{profile && <Profile profile={profile} />}</div>;
};

export default Result;
