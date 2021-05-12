const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/authentication', { useNewUrlParser: true })
  // eslint-disable-next-line no-console
  .catch(console.log);

mongoose.connection.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log(err);
});

module.exports = mongoose;
