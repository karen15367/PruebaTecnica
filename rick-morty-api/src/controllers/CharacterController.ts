import { ICharacterService } from '../../src/services/CharacterService';
import {Request, Response} from 'express';

export class CharacterController{
    constructor(private service: ICharacterService){}
    
    async getAliveCharacters(req: Request, res: Response): Promise<void> {
        res.json({results: []});
    }
}