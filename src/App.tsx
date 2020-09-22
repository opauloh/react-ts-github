import React, { Dispatch, Suspense, useReducer, useState } from 'react';
import * as Sentry from '@sentry/react';
import Loading from './components/Loading';
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

const Result = React.lazy(() => import('./components/Result'));
const Repositories = React.lazy(() => import('./components/Repositories'));

function App() {
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
        <Suspense fallback={<Loading />}>
          {username && <Result username={username} />}
          <Repositories />
        </Suspense>
      </div>
    </UserContext.Provider>
  );
}

export default Sentry.withProfiler(App);
