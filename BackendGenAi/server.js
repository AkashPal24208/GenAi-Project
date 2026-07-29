 require('dotenv').config();
const app = require('./src/app');
const connectToDB = require('./src/config/database');
 
  // const {resume,selfDescription,jobDescription} = require("./src/services/temp")

const generateInterviewReport = require("./src/services/ai.service")


connectToDB();

//  after returning JSON parse
 // generateInterviewReport({resume,selfDescription,jobDescription});

app.listen(3000,()=>{
    console.log(`http://localhost:3000`); 
})