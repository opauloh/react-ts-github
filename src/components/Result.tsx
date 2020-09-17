import React, { Dispatch, FC, useContext, useEffect, useReducer } from 'react';
import UserContext from '../contexts/userContext';
import { ResultAction, ResultState } from '../reducers/resultReducer';
import { getProfile } from '../utils/graphql';
import Loading from './Loading';
import Profile from './Profile';
import styles from './Result.module.css';

type Props = {
  username: string;
};

const Result: FC<Props> = ({ username }) => {
  const [{ error, profile, loading }, dispatch]: [
    ResultState,
    Dispatch<ResultAction>
  ] = useContext(UserContext);

  useEffect(() => {
    dispatch({ type: 'loading' });
    getProfile(username)
      .then((profile) => dispatch({ type: 'success', profile }))
      .catch(({ message }) => dispatch({ type: 'error', error: message }));
  }, [username]);

  if (loading) return <Loading />;

  if (error) return <div className={styles.error}>{error}</div>;

  return <div>{profile && <Profile profile={profile} />}</div>;
};

export default Result;
