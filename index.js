const server = require('./api/server.js');
const logger = require('./modules/Logger.js');
const port = 8000;

function log() {
    logger.log(`Starting server`);
    logger.log(`Server started on port: ${port}`, 'ready');
}
server.listen(port, log());