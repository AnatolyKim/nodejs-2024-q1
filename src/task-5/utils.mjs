export const validateRoute = (path, pattern) => {
  const regex = new RegExp(pattern);

  return regex.test(path);
}

export const getUserIdFromUrl = (url) => {
  const segments = url.split('/');

  return segments.find(segment => segment.match(/^[a-zA-Z0-9-]{36}$/));
}

export const parseRequestBody = (req) => new Promise((resolve, reject) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    resolve(JSON.parse(body));
  });

  req.on('error', (error) => {
    reject(error);
  });
});