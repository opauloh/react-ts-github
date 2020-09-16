import React, { FC } from 'react';
import styles from './Button.module.css';

const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <button className={styles.btn} {...props}>
    {children}
  </button>
);

export default Button;
