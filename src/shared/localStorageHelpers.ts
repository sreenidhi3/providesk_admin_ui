export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('Error while storing data in localstorage');
  }
};

export const loadLocalStorage = (key) => {
  try {
    const serializableState = localStorage.getItem(key);
    if (serializableState !== null) {
      return JSON.parse(serializableState);
    }
    return null;
  } catch (error) {
    console.log('Error while retrieving data from localstorage');
  }
};
