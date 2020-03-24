require('dotenv').config()
const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      authCtrl = require('./controllers/authController'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      app = express()
      port = SERVER_PORT;

app.use(express.json());

app.use(session({
   resave: true,
   saveUninitialized: false,
   secret: SESSION_SECRET
}))

massive({
   connectionString: CONNECTION_STRING,
   ssl: {rejectUnauthorized: false}
})
.then(db => {
   app.set('db', db)
   console.log('DB connected')
   app.listen(port, ()=> console.log(`Server is running on port: ${port}`));
})

app.post(`/api/register`, authCtrl.register);