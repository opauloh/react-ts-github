import React from 'react';
import Result from './Result';

export default {
  title: 'Result'
};

export const preview = () => <Result username="opauloh" />;

export const notFound = () => <Result username="c" />;
