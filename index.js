const server = require('./app');
port = process.env.PORT || 5000;

server.listen(port,  () => console.log(`Server start, port = ${port}`));
