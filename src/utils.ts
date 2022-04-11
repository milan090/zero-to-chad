export const getLastItem = (thePath: string) =>
  thePath.substring(thePath.lastIndexOf("/") + 1);
