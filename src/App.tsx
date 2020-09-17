import React, { Dispatch, useReducer, useState } from 'react';
import Repositories from './components/Repositories';
import Result from './components/Result';
import Search from './components/Search';
import Title from './components/Title';
import UserContext from './contexts/userContext';
import {
  ResultAction,
  resultsReducer,
  resultsState,
  ResultState
} from './reducers/resultReducer';

export interface IUsername {
  username: string;
  valid: Boolean;
}

export default function App() {
  const [username, setUsername] = useState<string | null>(null);

  const [profile, dispatch]: [ResultState, Dispatch<ResultAction>] = useReducer(
    resultsReducer,
    resultsState
  );

  const onSubmit = (username: string) => {
    dispatch({ type: 'reset' });
    setUsername(username);
  };

  return (
    <UserContext.Provider value={[profile, dispatch]}>
      <div className="container">
        <Title>React TS Github</Title>
        <Search onSubmit={onSubmit} />
        {username && <Result username={username} />}
        <Repositories />
      </div>
    </UserContext.Provider>
  );
}
