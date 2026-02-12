//testear la data que devuelve la api de rick and morty
import { CharacterRepository } from "../../src/repositories/CharacterRepository";
import { CharacterResponse } from "../../src/models/Character";

global.fetch = jest.fn(); // creamos fetch falso para los tests

describe("CharacterRepository", () => {

    let client: CharacterRepository;

    beforeEach(() => {
        client = new CharacterRepository();

        jest.clearAllMocks(); // Limpiar mocks antes de cada test
    });

    describe('fetchAllCharacters', () => {
        // obtener personajes exitosamente
        it('debería retornar todos los personajes de la API', async () => {
            const mockResponse = {
                info: {
                    count: 2,
                    pages: 1,
                    next: null,
                    prev: null
                },
                results: [
                    {
                        id: 1,
                        name: "Rick Sanchez",
                        status: "Alive",
                        species: "Human",
                        type: "",
                        gender: 'Male',
                        origin: {
                            name: "Earth (C-137)",
                            url: "https://rickandmortyapi.com/api/location/1"
                        },
                        location: {
                            name: "Earth (Replacement Dimension)",
                            url: "https://rickandmortyapi.com/api/location/20"
                        },
                        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
                        episode: [
                            "https://rickandmortyapi.com/api/episode/1",
                            "https://rickandmortyapi.com/api/episode/2"
                        ],
                        url: "https://rickandmortyapi.com/api/character/1",
                        created: "2017-11-04T18:48:46.250Z"
                    },
                    {
                        id: 2,
                        name: "Morty Smith",
                        status: "Alive",
                        species: "Human",
                        type: "",
                        gender: 'Male',
                        origin: {
                            name: "Earth (C-137)",
                            url: "https://rickandmortyapi.com/api/location/1"
                        },
                        location: {
                            name: "Earth (Replacement Dimension)",
                            url: "https://rickandmortyapi.com/api/location/20"
                        },
                        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
                        episode: [
                            "https://rickandmortyapi.com/api/episode/1",
                            "https://rickandmortyapi.com/api/episode/2"
                        ],
                        url: "https://rickandmortyapi.com/api/character/2",
                        created: "2017-11-04T18:48:46.250Z"
                    }
                ]
            };

            // Mockear la respuesta de fetch
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse
            });

            //ejecutar funcipon a testear
            const characters = await client.fetchAllCharacters();

            // Verificar
            expect(characters).toHaveLength(2);

            expect(characters[0].name).toBe('Rick Sanchez');
            expect(characters[1].name).toBe('Morty Smith');

            expect(fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character');
        });

        //Manejo de paginación
        it('debería manejar la paginación correctamente', async () => {
            const page1Response: CharacterResponse = {
                info: {
                    count: 3,
                    pages:2,
                    next: 'https://rickandmortyapi.com/api/character?page=2',
                    prev: null
                },
                results: [
                    {
                        id: 1,
                        name: "Rick Sanchez",
                        status: "Alive",

                        species: "Human",
                        type: "",
                        gender: 'Male',
                        origin: {
                            name: "Earth (C-137)",
                            url: "https://rickandmortyapi.com/api/location/1"
                        },
                        location: {
                            name: "Earth (Replacement Dimension)",
                            url: "https://rickandmortyapi.com/api/location/20"
                        },
                        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
                        episode: [
                            "https://rickandmortyapi.com/api/episode/1",
                            "https://rickandmortyapi.com/api/episode/2"
                        ],
                        url: "https://rickandmortyapi.com/api/character/1",
                        created: "2017-11-04T18:48:46.250Z"
                    }
                ]

            };

            const page2Response: CharacterResponse = {
                info: {
                    count: 3,
                    pages: 2,
                    next: null,
                    prev: 'https://rickandmortyapi.com/api/character?page=1'
                },
                results: [
                    {
                        id: 2,
                        name: "Morty Smith",
                        status: "Alive",
                        species: "Human",
                        type: "",
                        gender: 'Male',
                        origin: {
                            name: "Earth (C-137)",
                            url: "https://rickandmortyapi.com/api/location/1"
                        },
                        location: {
                            name: "Earth (Replacement Dimension)",
                            url: "https://rickandmortyapi.com/api/location/20"
                        },
                        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
                        episode: [
                            "https://rickandmortyapi.com/api/episode/1",
                            "https://rickandmortyapi.com/api/episode/2"
                        ],
                        url: "https://rickandmortyapi.com/api/character/2",
                        created: "2017-11-04T18:48:46.250Z"
                    }
                ]
            };

            //mock para pagina 1 y 2
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => page1Response
            }).mockResolvedValueOnce({
                ok: true,
                json: async () => page2Response
            });

            const result = await client.fetchAllCharacters();

            //verficiar
            expect(result).toHaveLength(2);
            expect(result[0].name).toBe('Rick Sanchez');
            expect(result[1].name).toBe('Morty Smith');

            expect(fetch).toHaveBeenCalledTimes(2);
        });

        it('debería lanzar error cuando la API falla', async () => {
            (fetch as jest.Mock).mockResolvedValue({
                ok: false,
                status: 500,
                json: async () => ({ error: 'Internal Server Error' })
            });

            await expect(client.fetchAllCharacters()).rejects.toThrow('Error fetching characters: 500');
        });

        it('debería lanzar error cuando hay un problema de red', async () => {
            (fetch as jest.Mock).mockRejectedValue(new Error('Network Error'));

            await expect(client.fetchAllCharacters()).rejects.toThrow('Network Error');
        });
        //nuevos tests
        it('debería manejar correctamente cuando la api no devuelve personajes', async () => {
            const emptyResponse: CharacterResponse = {
                info: {
                    count: 0,
                    pages: 1,
                    next: null,
                    prev: null
                },
                results: []
            };

            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => emptyResponse
            });

            const result = await client.fetchAllCharacters();
            expect(result).toHaveLength(0);
            expect(result).toEqual([]);
    });
    it('debería manejar error 404 correctamente', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            status: 404,
            json: async () => ({ error: 'Not Found' })
        });
        await expect(client.fetchAllCharacters()).rejects.toThrow('Error fetching characters: 404');
    });

    it('debería manejar error 403', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 403,
            statusText: 'Forbidden',
        });
        await expect(client.fetchAllCharacters()).rejects.toThrow('Error fetching characters: 403');
    });
});
});