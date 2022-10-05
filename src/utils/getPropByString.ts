// Used to get nested accessor
export const getPropByString = (obj: any, value: any) => {
  if (!value) return obj;
  const properties = value.split('.');
  return getPropByString(obj[properties.shift()], properties.join('.'));
};
