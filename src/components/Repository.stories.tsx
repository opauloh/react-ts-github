import React from 'react';
import Repository, { IRepository } from './Repository';

export default {
  title: 'Repository'
};

const mock: IRepository = {
  id: 'id',
  url: 'https://github.com/opauloh/react-ts-github',
  description: 'react-ts-github',
  name: 'react-ts-github'
};

export const preview = () => <Repository repository={mock} />;
