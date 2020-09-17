import { IProfile } from '../components/Profile';
import { IRepositories } from '../components/Repositories';
import { getCache, setCache, isCached } from './cache';

function fetchGraphQL<T>(
  search: string,
  cache: boolean = true,
  delay: number = 0
): Promise<T> {
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

const REPOSITORIES = (login: string, sorting: Sorting, cursor: Cursor) =>
  JSON.stringify({
    query: `
    query userRepositories($login: String!, $sorting: String!, $cursor: String) {
      user(login: $login) {
        repositories(orderBy: {field: NAME, direction: $sorting}, first: 10, after: $cursor) {
          edges {
            cursor
            node {
              id
              url
              description
              name          
            }
          }
        }
      }
    }`,
    variables: { login, sorting, cursor }
  });

export function getRepositories(
  username: string,
  sorting: Sorting,
  cursor: Cursor
) {
  interface IRepositoriesUsersRepositoriesEdges {
    edges: IRepositories[];
  }
  interface IRepositoriesUsersRepositories {
    repositories: IRepositoriesUsersRepositoriesEdges;
  }
  interface IRepositoriesUsers {
    user: IRepositoriesUsersRepositories;
  }

  return fetchGraphQL<IRepositoriesUsers>(
    REPOSITORIES(username, sorting, cursor)
  ).then((repositories: IRepositoriesUsers) => {
    return repositories.user.repositories.edges;
  });
}
