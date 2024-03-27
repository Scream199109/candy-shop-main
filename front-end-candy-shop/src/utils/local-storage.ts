export const getLocalStorageItem = (key: string) => {
  if (typeof localStorage !== 'undefined') {
    const Ls = localStorage.getItem(key);
    return Ls ? JSON.parse(Ls) : null
  }
  return null
}
