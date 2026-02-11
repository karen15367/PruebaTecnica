export interface Character {
    id: number;
    name: string;
    status: string;
    gender: string;
}

export interface CharacterResponse {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export interface APIResponse{
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: CharacterResponse[];
}

export interface ProcessedResponse {
    results: Character[];
}