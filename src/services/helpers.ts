export const getYesterdayDate = (): Date => {
  return new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
};

/**
 * Probability Simulator
 * @param probability Should have value in between 0 and 1 that is, [0,1]
 * @returns
 */
export const willOccur = (probability: number): boolean => {
  return Math.random() <= probability;
};
