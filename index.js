const server = require('./app');
const {startServerCheckAdmin, startServerCheckVersion} = require("./startFunctionals");
// const {uploadTranslation} = require("./translations/translation");
port = process.env.PORT || 5000;

// uploadTranslation();

startServerCheckAdmin();
startServerCheckVersion();

server.listen(port,  () => console.log(`Server start, port = ${port}`));


