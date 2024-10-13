const deepFreeze = <T>(obj: T) => {
  Object.freeze(obj);

  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      deepFreeze(obj[key]);
    }
  }
};

export default deepFreeze;
