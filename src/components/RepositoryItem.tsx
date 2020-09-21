import React, { FC } from 'react';
import { Repository } from '../api';
import styles from './RepositoryItem.module.css';

type Props = {
  repository: Repository;
};

const RepositoryItem: FC<Props> = ({ repository }) => {
  return (
    <div className={styles.repository}>
      <div className={styles.name}>
        <a href={repository.url} target="_blank">
          {repository.name}
        </a>
      </div>
      <div className={styles.description}>{repository.description}</div>
    </div>
  );
};

export default RepositoryItem;
