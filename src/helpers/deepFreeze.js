const deepFreeze = (obj) => {
  Object.freeze(obj);

  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      deepFreeze(obj[key]);
    }
  }
};

export default deepFreeze;
