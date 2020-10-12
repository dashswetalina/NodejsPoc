import express from 'express';
// import the sagger lib
import swaggerUi = require('swagger-ui-express');
import bodyParser = require("body-parser");
const app = express()

      
  /* Swagger files start */
  const YAML = require('yamljs');
  const swaggerDocument = YAML.load('./swagger.yaml');
/* Swagger files end */    
const port = 8000;
// place holder for the data
const responseObj = {
  statusCode: 0,
  data:{
    firstName:"",
    lastName:"",
    clientId:"",
  }
};

const errorObj = {
  statusCode: 0,
  msg:""
};

app.use(bodyParser.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/api/v1/parse', (req, res) => {
   let parseData = req.body.data;
   if(parseData && parseData.length>0 && parseData.indexOf("0")>-1){
    let splitData = parseData.split("0");
    responseObj.statusCode=200;
    let firstName=splitData[0];
    let lastName="";
    let count=0;
    let appendFirst="0";
    let appendLast="0";
  for(let i=1;i<splitData.length;i++){
    if(splitData[i].length>0){   
      if(count==0){
        lastName=splitData[i];
        count=1;
      }else{
        responseObj.data.clientId=splitData[i];
      }
      
    }else{
      if(count==0){
        appendFirst+="0"
      }else if(count==1){
        appendLast+="0";
      }
    }
  }
  responseObj.data.firstName=firstName+appendFirst;
  responseObj.data.lastName=lastName+appendLast;
    res.status(200).json(responseObj);
   }else{
    errorObj.statusCode=500;
    errorObj.msg="Error while parsing data" ;
    res.status(500).json(errorObj);
   }
   
   
})

app.post('/api/v2/parse', (req, res) => {
  let parseData = req.body.data;
  if(parseData && parseData.length>0 && parseData.indexOf("0")>-1){
  let splitData = parseData.split("0");
  responseObj.statusCode=200;
  responseObj.data.firstName=splitData[0];
  let count=0;
  for(let i=1;i<splitData.length;i++){
    if(splitData[i].length>0){   
      if(count==0){
        responseObj.data.lastName=splitData[i];
        count=1;
      }else{
       
        let objStr=splitData[i].substring(0,3)+"-"+splitData[i].substring(3,splitData[i].length)
        responseObj.data.clientId=objStr;
      }
      
    }
  }
    
  res.status(200).json(responseObj);
    
  }else{
    errorObj.statusCode=500;
    errorObj.msg="Error while parsing data" ;
    res.status(500).json(errorObj);
   }
  
})



app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})

export default app;
