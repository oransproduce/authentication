const  app  = require('./app.js');
const { port } = require('../config.js');

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});
