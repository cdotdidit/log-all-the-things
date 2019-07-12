
const server = require('./app');

const PORT = process.env.PORT || 3000;// this means to run it on any port if it doesnt have port 3000 avaliable to run it on
server.listen(PORT, () => console.log(`server is listening on ${PORT}`));