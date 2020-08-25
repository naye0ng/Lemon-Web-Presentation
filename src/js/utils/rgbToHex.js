export const rgbToHex = rgbText => {
  if (!rgbText) return;
  const rgb = rgbText.replace(/[^%,.\d]/g, '').split(',');
  const hex = rgb.map(dec => {
    const hexColor = parseInt(dec).toString(16);
    if (hexColor.length < 2) return `0${parseInt(dec).toString(16)}`;
    return parseInt(dec).toString(16);
  });
  return `#${hex.join('')}`;
};
