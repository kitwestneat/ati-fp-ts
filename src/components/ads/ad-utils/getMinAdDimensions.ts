import { AD_SIZES_MAP, AdSize } from '../ad-constants';

/**
 * getMinAdDimensions
 *
 * This function takes an adType which it uses to gets an array of size options
 * for the ad type and reduces the values to determine the width and height
 * minimums. Used in the MakeAdComponent HOC.
 *
 * @param {adType}
 * @returns {Object}  Object with minWidth and minHeight values
 */
export const getMinAdDimensions = (adType: string) => {
  const [minWidth, minHeight] = getSizeOptionsForType(adType).reduce(minDimsReducer);

  return { minWidth, minHeight };
};

/**
 * getSizeOptionsForType
 *
 * @param {String} adType - the type of add from the AD_TYPE enum in constants
 * @returns {[Sizes]} sizeOptionsArrayForType - array of potential ad sizes
 */
const getSizeOptionsForType = (adType: string): AdSize[] => AD_SIZES_MAP[adType];

/**
 * minDimsReducer
 *
 * reduces a list of [width, height] arrays returning the min value for each
 *
 * @param {AdSize} acc - accumulator for reduce function
 * @param {AdSize} item - current [width, height] pair being iterated
 * @returns {Array} [minWidth, minHeight]
 */
const minDimsReducer = (acc: AdSize, item: AdSize): AdSize => {
  const [itemWidth, itemHeight] = item;
  const [accWidth, accHeight] = acc;

  return [
    itemWidth < accWidth ? itemWidth : accWidth,
    itemHeight < accHeight ? itemHeight : accHeight
  ];
};
