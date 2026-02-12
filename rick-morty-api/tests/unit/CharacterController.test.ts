import { Request, Response } from 'express';
import {CharacterController} from '../../src/controllers/CharacterController';
import { CharacterService, ICharacterService } from '../../src/services/CharacterService';
import { ProcessedResponse } from '../../src/models/Character';
import { mock } from 'node:test';

describe('CharacterController', () => {
    let controller: CharacterController;
    let mockService: jest.Mocked<ICharacterService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockService = {
            getAliveCharacters: jest.fn()
        };

        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        controller = new CharacterController(mockService);
    });

    describe('getAliveCharacters', () => {
        it('debería devolver los personajes vivos y estatus 200', async () => {
            const mockData: ProcessedResponse = {
                results: [
                    { id: 1, name: 'Rick Sanchez', status: 'Alive', gender: 'Male' },
                    { id: 2, name: 'Morty Smith', status: 'Alive', gender: 'Male' }
                ]
            };

            mockService.getAliveCharacters.mockResolvedValueOnce(mockData);

            await controller.getAliveCharacters(mockRequest as Request, mockResponse as Response);

            expect(mockService.getAliveCharacters).toHaveBeenCalledTimes(1);
            expect(mockResponse.json).toHaveBeenCalledWith(mockData);
        });
        it('debería llamar a Service.getAliveCharacters()', async () => {
            const mockData: ProcessedResponse = { results: [] };

            mockService.getAliveCharacters.mockResolvedValueOnce(mockData);

            await controller.getAliveCharacters(mockRequest as Request, mockResponse as Response);
            
            expect(mockService.getAliveCharacters).toHaveBeenCalled();
        });
        it('debería manejar errores y devolver estatus 500', async () => {
            const errorMessage = 'Error en el servicio';

            mockService.getAliveCharacters.mockRejectedValueOnce(new Error(errorMessage));

            await controller.getAliveCharacters(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error Fetching characters' });
        });
        it('debería devolver la estrcutura ProcessedResponse', async () => {
            const mockData: ProcessedResponse = {
                results: [
                    { id: 1, name: 'Rick Sanchez', status: 'Alive', gender: 'Male' },
                    { id: 2, name: 'Morty Smith', status: 'Alive', gender: 'Male' }
                ]
            };

            mockService.getAliveCharacters.mockResolvedValueOnce(mockData);

            await controller.getAliveCharacters(mockRequest as Request, mockResponse as Response);

            const responseData =(mockResponse.json as jest.Mock).mock.calls[0][0];

            expect(responseData).toHaveProperty('results');
            for (let i = 0; i < 2; i++) {
                expect(Array.isArray(responseData.results)).toBe(true);
                expect(responseData.results[i]).toHaveProperty('id');
                expect(responseData.results[i]).toHaveProperty('name');
                expect(responseData.results[i]).toHaveProperty('status');
                expect(responseData.results[i]).toHaveProperty('gender');
            }
        });
    });
});
