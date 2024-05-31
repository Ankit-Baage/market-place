export const parseQuery = (queryString) => {
  const params = new URLSearchParams(queryString);
  const query = {};
  for (const [key, value] of params.entries()) {
    query[key] = value.split(',');
  }
  return query;
};

export const stringifyQuery = (queryObject) => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(queryObject)) {
    if (value) {
      params.set(key, value);
    }
  }
  return params.toString();
};

export const parseQueryOptions = (queryString) => {
  const params = new URLSearchParams(queryString);
  const query = {};
  for (const [key, value] of params.entries()) {
    query[key] = value.split(',');
  }
  return query;
};