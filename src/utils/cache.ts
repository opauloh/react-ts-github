export function setCache(key: string, data: object) {
  return Promise.resolve(
    window.localStorage.setItem(key, JSON.stringify(data))
  );
}
export function getCache(key: string) {
  return Promise.resolve(JSON.parse(window.localStorage.getItem(key)));
}
export function isCached(key: string) {
  return window.localStorage.getItem(key);
}
