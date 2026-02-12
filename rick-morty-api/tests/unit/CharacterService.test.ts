import { CharacterService } from '../../src/services/CharacterService';
import  { CharacterRepository } from '../../src/repositories/CharacterRepository';
import { ICharacterRepository } from '../../src/repositories/CharacterRepository';
import { ApiCharacter } from '../../src/models/Character';

describe('CharacterService', () => {
    let service: CharacterService;
    let mockRepository: jest.Mocked<ICharacterRepository>;

    beforeEach(() => {
        mockRepository = {
            fetchAllCharacters: jest.fn()
        };
        service = new CharacterService(mockRepository);
    });

    //testear el filtro de personajes vivos
    describe('getAliveCharacters', () => {
        it('debería filtrar solo los personajes vivos', async () => {
            const mockCharacters: ApiCharacter[] = [
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
                    created:"2017-11-04T18:48:46.250Z"
                },
                {
                    id: 3,
                    name: "Summer Smith",
                    status: "Alive",
                    species: "Human",
                    type: "",
                    gender: 'Female',
                    origin: {
                        name: "Earth (Replacement Dimension)",
                        url: "https://rickandmortyapi.com/api/location/20"
                    },
                    location: {
                        name: "Earth (Replacement Dimension)",
                        url: "https://rickandmortyapi.com/api/location/20"
                    },
                    image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
                    episode: [
                        "https://rickandmortyapi.com/api/episode/1",
                        "https://rickandmortyapi.com/api/episode/2"
                    ],
                    url: "https://rickandmortyapi.com/api/character/3",
                    created:"2017-11-04T18:48:46.250Z"
                }
            ];

            mockRepository.fetchAllCharacters.mockResolvedValue(mockCharacters);

            const result = await service.getAliveCharacters();

            expect(result.results).toHaveLength(3);
            expect(result.results[0].id).toBe(1);
            expect(result.results[1].id).toBe(2);
            expect(result.results[2].id).toBe(3);

            result.results.forEach((character: { status: any; }) => {
                expect(character.status).toBe('Alive');
            });
        });

        // Verificar el remplazo de espacios por guiones bajos
        it('debería reemplazar espacios por guiones bajos en los nombres de los personajes', async () => {
            const mockCharacters: ApiCharacter[] = [
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
                    created:"2017-11-04T18:48:46.250Z"
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
                    created:"2017-11-04T18:48:46.250Z"
                },
                {
                    id: 3,
                    name: "Summer Smith",
                    status: "Alive",
                    species: "Human",
                    type: "",
                    gender: 'Female',
                    origin: {
                        name: "Earth (Replacement Dimension)",
                        url: "https://rickandmortyapi.com/api/location/20"
                    },
                    location: {
                        name: "Earth (Replacement Dimension)",
                        url: "https://rickandmortyapi.com/api/location/20"
                    },
                    image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
                    episode: [
                        "https://rickandmortyapi.com/api/episode/1",
                        "https://rickandmortyapi.com/api/episode/2"
                    ],
                    url: "https://rickandmortyapi.com/api/character/3",
                    created:"2017-11-04T18:48:46.250Z"
                }
            ];

            mockRepository.fetchAllCharacters.mockResolvedValue(mockCharacters);

            const result = await service.getAliveCharacters();

            expect(result.results[0].name).toBe("Rick_Sanchez");
            expect(result.results[1].name).toBe("Morty_Smith");
            expect(result.results[2].name).toBe("Summer_Smith");

            //verificar que no contenga espcios
            result.results.forEach((character) => {
                expect(character.name).not.toContain(' ');
            });
        });

        //devolver formato ProcessedResponse
        it('debería devolver un objeto con formato ProcessedResponse', async () => {
            const mockCharacters: ApiCharacter[] = [
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
                    created:"2017-11-04T18:48:46.250Z"
                }
            ];

            mockRepository.fetchAllCharacters.mockResolvedValueOnce(mockCharacters);

            const result = await service.getAliveCharacters();

            expect(result).toHaveProperty('results');
            expect(result.results).toHaveLength(1);

            expect(result.results[0]).toEqual({
                id: 1,
                name: "Rick_Sanchez",
                status: "Alive",
                gender: 'Male'
            });

            expect(Object.keys(result.results[0])).toHaveLength(4);

            });
        });
        it('no debería incluir personajes vivos', async () => {
            const mockCharacters: ApiCharacter[] = [
                {
                    id: 47,
                    name: "Birdperson",
                    status: "Dead",
                    species: "Bird-Person",
                    type: "",
                    gender: 'Male',
                    origin: {
                        name: "Bird World",
                        url: "https://rickandmortyapi.com/api/location/10"
                    },
                    location: {
                        name: "Earth (Replacement Dimension)",
                        url: "https://rickandmortyapi.com/api/location/20"
                    },
                    image: "https://rickandmortyapi.com/api/character/avatar/47.jpeg",
                    episode: [
                        "https://rickandmortyapi.com/api/episode/10",
                        "https://rickandmortyapi.com/api/episode/11"
                    ],
                    url: "https://rickandmortyapi.com/api/character/47",
                    created:"2017-11-04T18:48:46.250Z"
                }
            ];

            mockRepository.fetchAllCharacters.mockResolvedValue(mockCharacters);
            const result = await service.getAliveCharacters();

            const ids = result.results.map(c=> c.id);
            expect(ids).not.toContain(47);
        });
    });
