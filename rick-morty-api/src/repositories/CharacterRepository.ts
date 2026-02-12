import { Character, ApiCharacter, CharacterResponse } from '../models/Character';

//inyección de dependencias para facilitar el testing
export interface ICharacterRepository {
    fetchAllCharacters(): Promise<Character[]>;
}

//obtener datos de la Api Rick and Morty
export class CharacterRepository implements ICharacterRepository {
    private readonly apiUrl: string = 'https://rickandmortyapi.com/api';

    async fetchAllCharacters(): Promise<ApiCharacter[]> {
        const allCharacters: ApiCharacter[] = [];
        let nextUrl: string | null = `${this.apiUrl}/character`;

        while(nextUrl){
            const pageData = await this.fetchPage(nextUrl);
            allCharacters.push(...pageData.results);
            nextUrl = pageData.info.next;
        }
        return allCharacters;
    }


    //función para obtener los datos de cada página de la API
    private async fetchPage(url: string): Promise<CharacterResponse> {
        try {
            const response = await fetch(url);
            if(!response.ok){
                throw new Error(`Error fetching characters: ${response.status}`); //error 500
            }
            
            const data: CharacterResponse = await response.json(); // data del personaje
            return data;
        } catch (error) {
            if(error instanceof Error){
                throw error;
            }
            throw new Error('Unknown error occurred while fetching character data');
        }
    }
}
