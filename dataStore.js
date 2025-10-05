// dataStore.js
const STORE_KEY = 'ihp_user'; // Intelligent Health Platform
export const ds = {
  get: () => JSON.parse(localStorage.getItem(STORE_KEY) || '{}'),
  set: (k, v) => {
    const d = ds.get();
    d[k] = v;
    localStorage.setItem(STORE_KEY, JSON.stringify(d));
    // 触发仪表盘刷新
    window.dispatchEvent(new Event('ihp:update'));
  },
  clear: () => localStorage.removeItem(STORE_KEY)
};