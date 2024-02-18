export const removeNumeric = (str: string) => {
  return str.replace(/\^\d/g, '');
};
