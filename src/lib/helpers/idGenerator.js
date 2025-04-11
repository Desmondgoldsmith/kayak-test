// This generator creates increments of id with each call
let idCounter = 0;

export const generateId = () => {
  idCounter += 1;
  return idCounter.toString();
};

export const resetIdCounter = () => {
  idCounter = 0;
};