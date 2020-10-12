import {expect} from 'chai';
import app from './index';
import {agent as request} from 'supertest';


describe("Index Test", () => {
    it('should always pass', function () {
        expect(true).to.equal(true);
    });

    it('should POST /api/v1/parse', async function () {
        const responseData={
            "statusCode": 200,
            "data": {
              "firstName": "JOHN0000",
              "lastName": "MICHAEL000",
              "clientId": "9994567"
            }
          }
        const res = await request(app)
            .post('/api/v1/parse').send({
                "data": "JOHN0000MICHAEL0009994567"
              });
             
        expect(res.status).to.equal(200);
        expect(res.text).to.equal(JSON.stringify(responseData));
    });

    it('error /api/v1/parse', async function () {
        const responseData={"statusCode":500,"msg":"Error while parsing data"};
        const res = await request(app)
            .post('/api/v1/parse').send({
                "data": ""
              });
             
        
        expect(res.text).to.equal(JSON.stringify(responseData));
    });

    it('should POST /api/v2/parse', async function () {
        const responseData={
            "statusCode": 200,
            "data": {
              "firstName": "JOHN",
              "lastName": "MICHAEL",
              "clientId": "999-4567"
            }
          }
        
        const res = await request(app)
            .post('/api/v2/parse').send({
                "data": "JOHN0000MICHAEL0009994567"
              });
             
              expect(res.status).to.equal(200);
              expect(res.text).to.equal(JSON.stringify(responseData));
    });

    it('error /api/v2/parse', async function () {
        const responseData={"statusCode":500,"msg":"Error while parsing data"};
        const res = await request(app)
            .post('/api/v2/parse').send({
                "data": "john"
              });
             
             
              expect(res.text).to.equal(JSON.stringify(responseData));
    });
});