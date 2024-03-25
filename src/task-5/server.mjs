import http from 'http';
import { ENV } from './constants.mjs';
import { handleRoutes } from './router.mjs';

const PORT = process.env.PORT || ENV.PORT;
const server = http.createServer((req, res) => handleRoutes(req, res));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));