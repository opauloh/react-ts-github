import React, { FC } from 'react';
import styles from './Profile.module.css';

type TotalCount = {
  totalCount: number;
};

export interface IProfile {
  avatarUrl: string;
  email: string;
  login: string;
  url: string;
  followers: TotalCount;
  repositories: TotalCount;
}

type Props = {
  profile: IProfile;
};

const Profile: FC<Props> = ({ profile }) => {
  const { avatarUrl, login, email, url, repositories, followers } = profile;
  return (
    <div className={styles.profile}>
      <div className={styles.avatar}>
        <img className={styles.avatar__img} src={avatarUrl} />
      </div>
      <div className={styles.info}>
        <ul className={styles.info__list}>
          <li>{login}</li>
          <li>{email}</li>
          <li>{repositories.totalCount} repositories</li>
          <li>{followers.totalCount} followers</li>
        </ul>
        <a className={styles.info__link} href={url} target="_blank">
          See profile on Github &gt;
        </a>
      </div>
    </div>
  );
};

export default Profile;
