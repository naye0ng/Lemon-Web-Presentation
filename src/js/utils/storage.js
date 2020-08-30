const APP_KEY = 'lemon';
const storage = localStorage;

export const setStorageItem = (key, value) => {
  storage[`${APP_KEY}_${key}`] = JSON.stringify(value);
};

export const getStorageItem = key => JSON.parse(storage[`${APP_KEY}_${key}`] || null);

export const deleteStorageItem = key => storage.removeItem(`${APP_KEY}_${key}`);
