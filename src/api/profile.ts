import fetchGraphQL from './graphql';

export interface Profile {
  avatarUrl: string;
  email: string;
  login: string;
  url: string;
  followers: TotalCount;
  repositories: TotalCount;
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
    user: Profile;
  }

  return fetchGraphQL<RequestProfile>(PROFILE(username)).then(
    (profile: RequestProfile) => {
      return profile.user;
    }
  );
}
