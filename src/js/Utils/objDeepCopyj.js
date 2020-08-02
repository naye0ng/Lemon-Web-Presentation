
export const objDeepCopy = obj => {
  const copy = {};
  for (const i in obj) {
    if (typeof obj[i] === 'object' && obj[i] !== null) copy[i] = objDeepCopy(obj[i]);
    else copy[i] = obj[i];
  }
  return copy;
};
