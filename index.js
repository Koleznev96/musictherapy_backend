const server = require('./app');
const {startServer} = require("./startFunctionals");
// const {uploadTranslation} = require("./translations/translation");
port = process.env.PORT || 5000;

// uploadTranslation();

startServer();

server.listen(port,  () => console.log(`Server start, port = ${port}`));


