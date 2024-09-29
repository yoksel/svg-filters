// I use custom function to make it possible to work with Jest tests
// I failed to mock lodash version
const deepClone = <T>(obj: T): T => {
  let resultObj = {};

  if (Array.isArray(obj)) {
    resultObj = [];
  }

  for (let key in obj) {
    if (Array.isArray(obj[key])) {
      // @ts-expect-error
      resultObj[key] = [...obj[key]];
    } else if (typeof obj[key] === 'object') {
      // @ts-expect-error
      resultObj[key] = deepClone(obj[key]);
    } else {
      // @ts-expect-error
      resultObj[key] = obj[key];
    }
  }

  return resultObj as T;
};

export default deepClone;
