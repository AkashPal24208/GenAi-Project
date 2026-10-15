 require('dotenv').config();
 const dns = require('dns');
 dns.setServers([
  '8.8.8.8',
  '1.1.1.1'
]);
const app = require('./src/app');
const connectToDB = require('./src/config/database');
 
  // const {resume,selfDescription,jobDescription} = require("./src/services/temp")

const generateInterviewReport = require("./src/services/ai.service")

/**
 * @startingServer 
 */
const PORT = process.env.PORT || 3001;
async function startServer(){
    try{
     await connectToDB();
     app.listen(PORT,'0.0.0.0',()=>{
    console.log(`http://localhost:${PORT}`); 
});
    }catch(err){
    console.log("error while connecting MongoDB:",err);
    process.exit(1);
    }
}

startServer();
