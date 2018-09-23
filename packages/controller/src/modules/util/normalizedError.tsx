interface Error {
  path: string;
  message: string;
}

export const normalizedError = (erros: Error[]) => {
  const errMap: { [key: string]: string } = {};

  erros.forEach(err => {
    errMap[err.path] = err.message;
  });
  return errMap;
};
