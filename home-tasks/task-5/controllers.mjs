import { v4 as uuidv4 } from 'uuid';
import { getUserIdFromUrl, parseRequestBody } from './utils.mjs';

let users = [];

export const getUsers = (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=3600');

  setResponse(res, users);
};

export const getUserById = (req, res) => {
  const userId = getUserIdFromUrl(req.url);
  const user = users.find(user => user.id === userId);

  if (user) {
    setResponse(res, user)
  } else {
    res.statusCode = 404;
    setResponse(res, { message: 'User not found.' }, 404);
  }
};

export const createUser = async (req, res) => {
  try {
    const body = await parseRequestBody(req);
    const user = { id: uuidv4(), ...body, hobbies: [] };

    users.push(user);
  
    setResponse(res, user, 201);
  } catch (error) {
    setResponse(res, { message: 'Invalid JSON' }, 400);
  }
};

export const deleteUser = (req, res) => {
  const userId = getUserIdFromUrl(req.url);
  const user = users.find(user => user.id === userId);

  if (user) {
    users = users.filter(user => user.id === userId);

    setResponse(res, { message: 'User deleted successfully.' });
  } else {
    setResponse(res, { message: 'User not found.' + ' ' + userId }, 404);
  }
};

export const getUserHobbies = (req, res) => {
  const userId = getUserIdFromUrl(req.url);
  const user = users.find(user => user.id === userId);

  res.setHeader('Cache-Control', 'private, max-age=3600');

  if (user) {
    setResponse(res, { hobbies: user.hobbies, link: `/api/users/${userId}` });
  } else {
    setResponse(res, { message: 'User not found.' }, 404);
  }
};

export const updateUserHobbies = async (req, res) => {
  let body = '';

  try {
    const body = await parseRequestBody(req);
    const userId = getUserIdFromUrl(req.url);
    const user = users.find(user => user.id === userId);

    if (!user) {
      setResponse(res, { message: 'User not found.' }, 404);

      return;
    }

    user.hobbies = [...new Set([...user.hobbies, ...body.hobbies])];

    setResponse(res, user.hobbies);
  } catch (error) {
    setResponse(res, { message: 'Invalid JSON' }, 400);
  }
};

const setResponse = (res, body, statusCode = 200) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
};