const app = require('./index');

const server = app.listen(app.get('port'), () => {
  console.log(`Listening on ${server.address().port}`)
});

app.get('/', async(req, res) =>{
  console.log('x');
})
