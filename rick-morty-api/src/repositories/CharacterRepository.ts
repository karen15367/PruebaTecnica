import { Character, ApiCharacter, CharacterResponse } from '../models/Character';

//inyección de dependencias para facilitar el testing
export interface ICharacterRepository {
    fetchAllCharacters(): Promise<ApiCharacter[]>;
}

//obtener datos de la Api Rick and Morty
export class CharacterRepository implements ICharacterRepository {
    private readonly apiUrl: string = 'https://rickandmortyapi.com/api';
    async fetchAllCharacters(): Promise<ApiCharacter[]> {
        try {
            let allCharacters: ApiCharacter[] = [];
            let nextUrl: string | null = `${this.apiUrl}/character`;
            
            while(nextUrl){
                console.log(`Fetching characters from: ${nextUrl}`); //log para verificar la URL de cada página
                const data = await this.fetchPage(nextUrl);
                allCharacters = allCharacters.concat(data.results);
                nextUrl = data.info.next;
                await this.delay(100); //delay para evitar sobrecargar la API
            }
            console.log(`Total characters fetched: ${allCharacters.length}`); //log para verificar el total de personajes obtenidos
            return allCharacters;
        } catch (error) {
            if(error instanceof Error){
                console.error('Error fetching characters:', error);
                throw error;
            }
            throw new Error('Unknown error occurred while fetching characters');
        }
    }


    //función para obtener los datos de cada página de la API
    private async fetchPage(url: string, retries: number = 3): Promise<CharacterResponse> {
        try {
            const response = await fetch(url);
            if(response.status === 429){
                console.log(`Rate limit hit. Retrying in 1 second... (${retries} retries left)`);
                await this.delay(1000);
                return this.fetchPage(url);
            }
            if(!response.ok){
                throw new Error(`Error fetching characters: ${response.status}`); //error 500
            }
            console.log(`Fetched data from: ${url}`); //log para verificar la URL de cada página
            const data : CharacterResponse = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching page ${url}:`, error);
            if(error instanceof Error){
                throw error;
            }
            throw new Error('Unknown error occurred while fetching character data');
        }
    }

    private async delay(ms: number){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}