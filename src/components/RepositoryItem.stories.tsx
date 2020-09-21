import React from 'react';
import { Repository } from '../api';
import RepositoryItem from './RepositoryItem';

export default {
  title: 'RepositoryItem'
};

const mock: Repository = {
  id: 'id',
  url: 'https://github.com/opauloh/react-ts-github',
  description: 'react-ts-github',
  name: 'react-ts-github'
};

export const preview = () => <RepositoryItem repository={mock} />;
