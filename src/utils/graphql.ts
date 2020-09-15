import { getCache, setCache, isCached } from './cache';

function fetchGraphQL(search: string, cache: boolean = true) {
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
    .then((res) => res.json())
    .then((data) => {
      if (cache) setCache(search, data);
      return data;
    });
}

const PROFILE = (login: string) =>
  JSON.stringify({
    query: ` {
      user(login: "${login}") {
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
    }`
  });

export function getProfile(username: string) {
  return fetchGraphQL(PROFILE(username)).then((profile) => {
    if (profile.message) {
      throw new Error(profile.message);
    }

    return profile.data.user;
  });
}
