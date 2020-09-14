import React, { FC } from 'react';
import styles from './Title.module.css';

const Title: FC = ({ children }) => (
  <h1 className={styles.title}>{children}</h1>
);

export default Title;
