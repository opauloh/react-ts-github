import fetchGraphQL from './graphql';

export interface Repository {
  id: string;
  url: string;
  description: string;
  name: string;
}

export interface Repositories {
  cursor: string;
  node: Repository;
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
  interface RepositoriesUsers {
    user: {
      repositories: {
        edges: Repositories[];
      };
    };
  }

  return fetchGraphQL<RepositoriesUsers>(
    REPOSITORIES(username, sorting, cursor)
  ).then((repositories: RepositoriesUsers) => {
    return repositories.user.repositories.edges;
  });
}
