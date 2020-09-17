import React, { FC } from 'react';
import styles from './Repository.module.css';

export interface IRepository {
  id: string;
  url: string;
  description: string;
  name: string;
}

type Props = {
  repository: IRepository;
};

const Repository: FC<Props> = ({ repository }) => {
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

export default Repository;
