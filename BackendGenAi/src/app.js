const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cookieParser());

// helmet setUp 

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
       defaultSrc: ["'self'"],
        connectSrc: [
          "'self'", 
          "http://localhost:3001",
          "http://localhost:5173",
          "http://localhost:81"     // <--- Yahan http://localhost:81 add kar dein
        ],

      },
    },
  })
);

// using cors 
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:80', 'http://localhost:81'],
    credentials: true

}));

/*require all routes here */
const authRouter = require('./routes/auth.routes');

/* interview router */
const interviewRouter = require('../src/routes/interview.routes');

/* here we using all the routes*/
app.use('/api/auth',authRouter);
app.use("/api/interview",interviewRouter);



module.exports = app;