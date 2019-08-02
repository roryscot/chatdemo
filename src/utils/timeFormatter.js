export const timeFormatter = dateObject => {
  return dateObject.toLocaleTimeString().slice(0, -3);
};
