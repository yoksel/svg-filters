export const saveState = (state) => {
  localStorage.setItem('sf-state', JSON.stringify(state));
};

export const getState = () => {
  const storageValue = localStorage.getItem('sf-state');

  if (storageValue) {
    return JSON.parse(storageValue);
  }

  return {};
};
