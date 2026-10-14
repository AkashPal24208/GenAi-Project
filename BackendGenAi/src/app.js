const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:80',
  'http://localhost:81',
  'https://gen-ai-project-606bxn5w7-akash-47e7.vercel.app',
  'https://gen-ai-project-git-main-akash-47e7.vercel.app',
  'https://gen-ai-project-lyart.vercel.app' // <--- Yeh naya production URL add kar diya
];

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
       defaultSrc: ["'self'"],
       connectSrc: [
         "'self'", 
         "http://localhost:3001",
         "http://localhost:5173",
         "http://localhost:81",
         "https://gen-ai-project-606bxn5w7-akash-47e7.vercel.app",
         "https://gen-ai-project-git-main-akash-47e7.vercel.app",
         "https://gen-ai-project-lyart.vercel.app" // <--- Yahan bhi add karein
       ],
      },
    },
  })
);

app.use(cors({
    origin: allowedOrigins,
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