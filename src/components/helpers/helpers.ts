export const isIncludes = (array: string[], string: string) => {
  return array.some(element => element.includes(string));
};
