import app from "./index";

const server = app.listen(app.get('port'), () => {
  console.log(`Listening on ${server.address().port}`)
});
