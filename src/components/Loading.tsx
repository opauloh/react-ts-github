import React, { FC, useEffect, useState } from 'react';
import styles from './Loading.module.css';

type Props = {
  text?: string;
};

const Loading: FC<Props> = ({ text = 'Loading' }) => {
  const [content, setContent] = useState<string>(text);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setContent((content) =>
        content === text + '...' ? text : content + '.'
      );
    }, 50);

    return () => window.clearInterval(interval);
  }, [text]);

  return <div className={styles.loading}>{content}</div>;
};

export default Loading;
