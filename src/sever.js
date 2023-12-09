const webConfig = require('./config/viewEngine');
const initRouters = require('./routers/web');


const express = require('express')
const cookieParser = require('cookie-parser')

require('dotenv').config()

//create express
const app = express()
const port = process.env.PORT

//CORS

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//database connection config
//req.body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())// parse application/json

//template engine config
webConfig(app);

//config cookie
app.use(cookieParser());

//routers config
initRouters(app);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})