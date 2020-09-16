import React, { useState } from 'react';
import Result from './components/Result';
import Search from './components/Search';
import Title from './components/Title';

export default function App() {
  const [username, setUsername] = useState<null | string>(null);

  const onSubmit = (profile: string) => setUsername(profile);

  return (
    <div className="container">
      <Title>React TS Github</Title>
      <Search onSubmit={onSubmit} />
      {username && <Result username={username} />}
    </div>
  );
}
