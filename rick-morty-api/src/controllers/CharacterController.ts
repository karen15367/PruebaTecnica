import { ICharacterService } from '../../src/services/CharacterService';
import {Request, Response} from 'express';

export class CharacterController{
    constructor(private service: ICharacterService){}
    
    async getAliveCharacters(req: Request, res: Response): Promise<void> {
        try{
            const data = await this.service.getAliveCharacters(); 
            res.json(data); //convertir a JSON y enviar la respuesta
        }
        catch(error){
            res.status(500).json({ error: 'Error Fetching characters' });
        }
    }
}