import {expect} from 'chai';
import app from './index';
import {agent as request} from 'supertest';

describe("Index Test", () => {
    it('should always pass', function () {
        expect(true).to.equal(true);
    });

    it('should POST /api/v1/parse', async function () {
        const res = await request(app)
            .post('/api/v1/parse').send({statusCode: 200,data:{firstName:"",lastName:"",clientId:""}});
        expect(res.status).to.equal(200);
       
    });

    it('should POST /api/v2/parse', async function () {
        const res = await request(app)
            .post('/api/v1/parse').send({statusCode: 200,data:{firstName:"",lastName:"",clientId:""}});
        expect(res.status).to.equal(200);
       
    });
});