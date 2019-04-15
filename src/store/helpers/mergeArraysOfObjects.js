import merge from 'lodash.merge';

/**
 * Deep merges arrays of objects using a given comparator functions.
 * If no match for merging is found, the new object is added to the array
 *
 * eg
 *
 * const arr1 = [{x:1, y:2}]
 *
 * const arr2 = [{x:1, y:3, z:5}, {x:2, y:1}]
 *
 * const result = mergeArraysOfObjects(
 *  arr1,
 *  arr2,
 *  (arr1Obj, arr2Obj) => arr1Obj.x === arr2Obj.x     // merge on x value
 * )
 *
 * --> result: [{x:1, y:3, z:5}, {x:2, y:1}]
 *
 * @param  {Array} arr1
 * @param  {Array} arr2
 * @param  {Function} comparator (object, object) => boolean
 * @return {Array}
 */
export default (arr1, arr2, comparator) => {
  const arr1Copy = arr1.slice(0);

  arr2.forEach((arr2Obj) => {
    const foundArr1Index = arr1Copy.findIndex(arr1Obj => comparator(arr1Obj, arr2Obj));

    if (foundArr1Index > -1) {
      const foundArr1Obj = arr1Copy[foundArr1Index];
      arr1Copy[foundArr1Index] = merge({}, foundArr1Obj, arr2Obj);
    } else {
      arr1Copy.push(arr2Obj);
    }
  });

  return arr1Copy;
};
