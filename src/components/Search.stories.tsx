import React from 'react';
import Search from './Search';

export default {
  title: 'Search'
};

export const preview = () => <Search onSubmit={() => alert('test')} />;
