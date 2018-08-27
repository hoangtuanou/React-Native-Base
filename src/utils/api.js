const API_ROOT = 'https://jsonplaceholder.typicode.com';

const url = path => (
  path.indexOf('/') === 0 ? `${API_ROOT}${path}` : `${API_ROOT}/${path}`
);

const timeout = (promise, ms) => (
  new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('timeout')), ms);
    promise
      .then((response) => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch(reject);
  })
);


const bodyOf = async (requestPromise) => {
  try {
    const response = await requestPromise;
    return response.body;
  } catch (e) {
    throw e;
  }
};

const getRequestHeaders = (body, token) => {
  const headers = body
    ? { Accept: 'application/json', 'Content-Type': 'application/json' }
    : { Accept: 'application/json' };

  if (token) {
    return { ...headers, Authorization: token };
  }
  return headers;
};

const getAuthenticationToken = () => null;

const sendRequest = async (method, path, body) => {
  try {
    const endpoint = url(path);
    const token = getAuthenticationToken();
    const headers = getRequestHeaders(body, token);
    const options = body
      ? { method, headers, body: JSON.stringify(body) }
      : { method, headers };
    return timeout(fetch(endpoint, options), 6000);
  } catch (e) {
    throw new Error(e);
  }
};

const handleResponse = async (response) => {
  try {
    const responseBody = await response.text();
    return {
      status: response.status,
      headers: response.headers,
      body: responseBody ? JSON.parse(responseBody) : null,
    };
  } catch (e) {
    throw e;
  }
};

const request = async (method, path, body) => {
  try {
    const response = await sendRequest(method, path, body);
    return handleResponse(response);
  } catch (e) {
    throw e;
  }
};

export const get = async path => bodyOf(request('GET', path, null));

export default {};
