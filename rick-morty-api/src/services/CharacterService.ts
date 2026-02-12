import { ProcessedResponse } from "../models/Character";
import { ICharacterRepository } from "../repositories/CharacterRepository";

export interface ICharacterService {
    getAliveCharacters(): Promise<ProcessedResponse>;
}

export class CharacterService implements ICharacterService {
    constructor(private characterRepository: ICharacterRepository) {}

    async getAliveCharacters(): Promise<ProcessedResponse> {

        return {results: [] };
    }
}