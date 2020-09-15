export function setCache(key: string, data: any) {
  return Promise.resolve(
    window.localStorage.setItem(key, JSON.stringify(data))
  );
}
export function getCache(key: string) {
  const cache = window.localStorage.getItem(key);
  return Promise.resolve(JSON.parse(cache ? cache : ''));
}
export function isCached(key: string): boolean {
  return window.localStorage.getItem(key) !== null;
}
