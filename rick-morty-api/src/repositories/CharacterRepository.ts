import { Character } from '../models/Character';

export class CharacterRepository {
    async fetchAllCharacters(): Promise<Character[]> {
        return [];
    }
}