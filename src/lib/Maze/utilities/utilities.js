/**
 * A function to determine the sub grid should be horizontally cutted or not.
 * @param {Number} width The width of the sub grid.
 * @param {Number} height The height of the sub grid.
 * @returns {Boolean} Whether the sub grid should be horizontally cutted or not
 */
 export const isHorizontalCut = (width, height) => {
  if (width < height) return true;
  else if (width > height) return false;
  return Math.floor(Math.random() * 2) === 1;
};