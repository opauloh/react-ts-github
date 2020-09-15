import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './Search.module.css';

type Props = {
  onSubmit: Function;
};
export default function Search({ onSubmit }: Props) {
  const [username, setUsername] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username" className={styles.label}>
        Github Username
      </label>
      <div className={styles.search}>
        <input
          type="text"
          id="username"
          className={styles.input}
          placeholder="Type a Github username to fetch results"
          autoComplete="off"
          value={username}
          onChange={handleChange}
        />
        <button className={styles.btn} type="submit" disabled={!username}>
          SEARCH
        </button>
      </div>
    </form>
  );
}
