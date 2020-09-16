import React from 'react';
import Profile, { IProfile } from './Profile';

const mockProfile: IProfile = {
  avatarUrl:
    'https://avatars0.githubusercontent.com/u/19270322?u=af9fb47c4b447ca0bf458d1d98132682a92efe80&v=4',
  email: '',
  url: 'https://github.com/opauloh',
  login: 'opauloh'
  // followers: { totalCount: 8 },
  // repositories: { totalCount: 37 }
};

export default {
  title: 'Profile'
};

export const preview = () => <Profile profile={mockProfile} />;
