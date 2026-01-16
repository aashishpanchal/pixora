export const splitRows = <T>(array: T[], rows: number): T[][] => {
  const result: T[][] = Array.from({length: rows}, () => []);
  for (let i = 0; i < array.length; i++) {
    result[i % rows].push(array[i]);
  }
  return result;
};
