
/* eslint no-console: 0 */
'use strict';

// load our server module
var server = require('./server');

const port = process.env.PORT || 8000;

// tell the server to listen on a specific port
server.listen(port, () => {
    console.log('Server listening on port ' + port);
});
