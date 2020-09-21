import React, { FC } from 'react';
import useRepositories from '../hooks/useRepositories';
import Button from './Button';
import Loading from './Loading';
import styles from './Repositories.module.css';
import Repository from './RepositoryItem';
import Title from './Title';

const Repositories: FC = () => {
  const {
    profile,
    loading,
    repositories,
    error,
    sorting,
    sort,
    loadMore
  } = useRepositories();

  if (!profile) return <></>;
  if (!repositories) return <>empty</>;
  if (error) return <>error</>;

  const { totalCount } = profile.repositories;
  const totalRepositories = repositories.length;

  return (
    <div className={styles.repositories}>
      <div className={styles.header}>
        <Title>
          Showing {totalRepositories} Repositories out of {totalCount}{' '}
        </Title>
        <div>
          Sorting name: <Button onClick={sort}>{sorting}</Button>
        </div>
      </div>
      {repositories.map(({ node }) => (
        <Repository key={node.id} repository={node} />
      ))}
      <div>
        {loading && <Loading text="Loading Repositories" />}
        {totalRepositories < totalCount && (
          <Button onClick={loadMore}>Load More</Button>
        )}
      </div>
    </div>
  );
};

export default Repositories;
