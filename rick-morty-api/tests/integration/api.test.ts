import request from 'supertest';
import { createApp } from '../../src/app';

describe('test integracion de API', () => {
    const app = createApp();

    it('GET /characters/ProcessedCharacters - debería devolver personajes vivos', async () => {
        const response = await request(app).get('/characters/ProcessedCharacters').expect(200).expect('Content-Type', /json/);

        expect(response.body).toHaveProperty('results');
        expect(Array.isArray(response.body.results)).toBe(true);
        expect(response.body.results.length).toBeGreaterThan(0);

        //estrcutura de personajes
        const character = response.body.results[0];
        expect(character).toHaveProperty('id');
        expect(character).toHaveProperty('name');
        expect(character).toHaveProperty('status');
        expect(character).toHaveProperty('gender');

        //verificar que todos los personajes devueltos estén vivos y que sus nombres no contengan espacios
        response.body.results.forEach((char: { status: any; name: any; }) => {
            expect(char.status).toBe('Alive');
            expect(char.name).not.toContain(' ');
        });
        },30000); //aumentar timeout para evitar fallos por lentitud de la API
});
