import express from 'express';
// import the sagger lib
import swaggerUi = require('swagger-ui-express');
import bodyParser = require("body-parser");
import fs = require('fs')
import { parse } from 'path';
const path = require('path');
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
    parseData.split("0");
    responseObj.statusCode=200;
    responseObj.data.firstName=parseData[0];
    responseObj.data.lastName=parseData[1];
    responseObj.data.clientId=parseData[2];
    res.json(responseObj);
   }else{
    errorObj.statusCode=500;
    errorObj.msg="Error while parsing data" ;
    res.json(errorObj);
   }
   
   
})

app.post('/api/v2/parse', (req, res) => {
  let parseData = req.body.data;
  if(parseData && parseData.length>0 && parseData.indexOf("0")>-1){
   parseData.replace("^0*", "-")
   parseData.split("-")
   responseObj.statusCode=200;
   responseObj.data.firstName=parseData[0];
    responseObj.data.lastName=parseData[1];
    responseObj.data.clientId=parseData[2];
  }else{
    errorObj.statusCode=500;
    errorObj.msg="Error while parsing data" ;
    res.json(errorObj);
   }
  res.json(responseObj);
})



app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
