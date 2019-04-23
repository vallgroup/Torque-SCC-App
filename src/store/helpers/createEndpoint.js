/**
 * Object of key: value pairs to a query string
 *
 * { key1: value1, key2: value2 } => ?key1=value1&key2=value2
 */
const createQueryString = (queryObj) => {
  if (!queryObj || !Object.keys(queryObj).length) return '';

  let queryStr = '?';
  Object.keys(queryObj).forEach((key) => {
    queryStr += `${key}=${queryObj[key]}`;
  });
  return queryStr;
};

/**
 * Attach the endpoint and query to our base url
 */
export default (endpoint, queryObj) => {
  const { protocol, hostname } = window.location;
  const queryStr = createQueryString(queryObj);

  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) {
    return `http://localhost:8000/index.php/wp-json/scc/v1/${endpoint}${queryStr}`;
  }

  const isStaging = hostname.includes('torquelaunchdev');
  if (isStaging) {
    return `${protocol}//api.${hostname}/index.php/wp-json/scc/v1/${endpoint}${queryStr}`;
  }

  const isProduction = hostname.includes('schaumburgcorporatecenter');
  if (isProduction) {
    return `${protocol}//tour-data.schaumburgcorporatecenter.com/index.php/wp-json/scc/v1/${endpoint}${queryStr}`;
  }

  // try adding api to our current hostname as a fallback
  return `${protocol}//api.${hostname}/index.php/wp-json/scc/v1/${endpoint}${queryStr}`;
};
