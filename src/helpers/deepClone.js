const deepClone = (obj) => {
  let resultObj = {};

  if (Array.isArray(obj)) {
    resultObj = [];
  }

  for (let key in obj) {
    if (Array.isArray(obj[key])) {
      resultObj[key] = [...obj[key]];
    } else if (typeof obj[key] === 'object') {
      resultObj[key] = deepClone(obj[key]);
    } else {
      resultObj[key] = obj[key];
    }
  }

  return resultObj;
};

export default deepClone;
