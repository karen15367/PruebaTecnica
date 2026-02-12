import { ApiCharacter, Character, ProcessedResponse } from "../models/Character";
import { ICharacterRepository } from "../repositories/CharacterRepository";

export interface ICharacterService {
    getAliveCharacters(): Promise<ProcessedResponse>;
}

export class CharacterService implements ICharacterService {
    constructor(private repository: ICharacterRepository) {}

    async getAliveCharacters(): Promise<ProcessedResponse> {

        const allCharacters = await this.repository.fetchAllCharacters();

        const aliveCharacters = allCharacters.filter(character => character.status === 'Alive');

        const processedCharacters: Character[] = aliveCharacters.map(character => ({
            id: character.id,
            name: character.name.replace(/\s/g, '_'),
            status: character.status,
            gender: character.gender
        }));

        return { results: processedCharacters };
    }
}