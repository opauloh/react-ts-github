import { getCache, setCache, isCached } from '../utils/cache';

export default function fetchGraphQL<T>(
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
