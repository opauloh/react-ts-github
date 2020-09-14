import React from 'react';
import Search from './components/Search';
import Title from './components/Title';

export default function App() {
  return (
    <div className="container">
      <Title>React TS Github</Title>
      <Search onSubmit={() => ({})} />
    </div>
  );
}
