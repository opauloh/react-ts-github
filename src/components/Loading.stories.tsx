import React from 'react';
import Loading from './Loading';

export default {
  title: 'Loading'
};

export const preview = () => <Loading />;

export const customText = () => <Loading text="Custom Text" />;
