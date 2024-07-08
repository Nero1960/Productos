import { describe, expect, it} from '@jest/globals'
import request from 'supertest';
import server from '../server';


describe('GET - api', () => {
    
    
    it('should send back a response json', async () => {
        const response = await request(server).get('/api')

        expect(response.status).toBe(200);
        expect(response.header['content-type']).toMatch(/json/)
        expect(response.status).not.toBe(404);
        console.log(response.status)
    }
)
})