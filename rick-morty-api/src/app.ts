import express from 'express';
import { CharacterController } from './controllers/CharacterController';
import { CharacterService } from './services/CharacterService';
import { CharacterRepository } from './repositories/CharacterRepository';

//const app = express();
//const port = 3000;

//app.use(express.json());

export function createApp() {
    //dependencias
    const repository = new CharacterRepository();
    const service = new CharacterService(repository);
    const controller = new CharacterController(service);

    const app = express();
    app.use(express.json());

    //ruta
    app.get('/characters/ProcessedCharacters', controller.getAliveCharacters.bind(controller));

    return app;
}