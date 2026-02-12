import express from 'express';
import { CharacterController } from './controllers/CharacterController';
import { CharacterService } from './services/CharacterService';
import { CharacterRepository } from './repositories/CharacterRepository';

const app = express();
const port = 3000;

app.use(express.json());

//dependencias
const repository = new CharacterRepository();
const service = new CharacterService(repository);
const controller = new CharacterController(service);

//endpoint para obtener personajes vivos
app.get('/characters/ProcessedCharacters', controller.getAliveCharacters.bind(controller));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/characters/ProcessedCharacters`);
});