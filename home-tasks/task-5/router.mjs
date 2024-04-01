import url from 'url';
import { getUsers, createUser, deleteUser, getUserHobbies, updateUserHobbies, getUserById } from './controllers.mjs';
import { API, UUID_PATTERN } from './constants.mjs';
import { validateRoute } from './utils.mjs';

export const handleRoutes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  switch (true) {
    case path === API.USERS && method === 'GET':
      getUsers(req, res);
      break;
    case path === API.USERS && method === 'POST':
      createUser(req, res);
      break;
    case validateRoute(path, `^${API.USERS}${UUID_PATTERN}$`) && method === 'GET':
      getUserById(req, res);
      break;
    case validateRoute(path, `^${API.USERS}${UUID_PATTERN}$`) && method === 'DELETE':
      deleteUser(req, res);
      break;
    case validateRoute(path, `^${API.USERS}${UUID_PATTERN}${API.HOBBIES}$`) && method === 'GET':
      getUserHobbies(req, res);
      break;
    case validateRoute(path, `^${API.USERS}${UUID_PATTERN}${API.HOBBIES}$`) && method === 'PATCH':
      updateUserHobbies(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Not found' }));
      break;
  }
};
