const app = require('./index');

const server = app.listen(app.get('port'), () => {
  console.log(`Listening on ${server.address().port}`)
});
