export const getYesterdayDate = (): Date => {
  return new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
};
