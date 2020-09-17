import { IProfile } from '../components/Profile';
import { getCache, setCache, isCached } from './cache';

function fetchGraphQL<T>(search: string, cache: boolean = true): Promise<T> {
  if (cache && isCached(search)) return getCache(search);
  return fetch(`https://api.github.com/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_GITHUB_AUTH_TOKEN}`
    },
    body: search
  })
    .then((res) => res.json() as Promise<{ data: T; errors: any }>)
    .then(
      (res) =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(res);
          }, delay);
        }) as Promise<{ data: T; errors: any }>
    )
    .then((data) => {
      if (data.errors)
        throw new Error(data.errors.map((e: any) => e.message).join(', '));

      if (cache) setCache(search, data.data);
      return data.data;
    });
}

const PROFILE = (login: string) =>
  JSON.stringify({
    query: `
    query userProfile($login: String!) {
      user(login: $login) {
        avatarUrl
        email
        url
        login
        followers {
          totalCount
        }
        repositories {
          totalCount
        }
      }
    }`,
    variables: { login }
  });

export function getProfile(username: string) {
  interface RequestProfile {
    user: IProfile;
  }

  return fetchGraphQL<RequestProfile>(PROFILE(username)).then(
    (profile: RequestProfile) => {
      return profile.user;
    }
  );
}
