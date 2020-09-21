export function setCache(key: string, data: any) {
  return Promise.resolve(
    window.sessionStorage.setItem(key, JSON.stringify(data))
  );
}
export function getCache(key: string) {
  const cache = window.sessionStorage.getItem(key);
  return Promise.resolve(JSON.parse(cache ? cache : ''));
}
export function isCached(key: string): boolean {
  return window.sessionStorage.getItem(key) !== null;
}
