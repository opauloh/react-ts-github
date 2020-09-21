import React, { FC } from 'react';
import useProfile from '../hooks/useProfile';
import Loading from './Loading';
import Profile from './ProfileInfo';
import styles from './Result.module.css';

type Props = {
  username: string;
};

const Result: FC<Props> = ({ username }) => {
  const { error, loading, profile } = useProfile(username);
  if (loading) return <Loading />;

  if (error) return <div className={styles.error}>{error}</div>;

  return <div>{profile && <Profile profile={profile} />}</div>;
};

export default Result;
