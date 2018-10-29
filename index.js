require('dotenv').config();

const server = require('./api/server.js');
const logger = require('./modules/Logger.js');

const port = process.env.PORT || 8000;

/**
 * Log the server start status
 */
function log() {
    logger.log(`Starting server`);
    logger.log(`Server started on port: ${port}`, 'ready');
}

server.listen(port, log());