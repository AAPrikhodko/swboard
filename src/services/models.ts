export interface Dto<T> {
    count: number
    next: string | null
    previous: string | null
    results: Array<T>
}

export interface Character {
    birth_year: string;
    eye_color: string;
    films: string[];
    gender: string;
    hair_color: string;
    height: string;
    homeworld: string;
    mass: string;
    name: string;
    skin_color: string;
    created: Date;
    edited: Date;
    species: string[];
    starships: string[];
    url: string;
    vehicles: string[];
}

export interface Starship {
    MGLT: string
    cargo_capacity: string
    consumables: string
    cost_in_credits: string
    created: string
    crew: string
    edited: string
    hyperdrive_rating: string
    length: string
    manufacturer: string
    max_atmosphering_speed: string
    model: string
    name: string
    passengers: string
    films: string[]
    pilots: string[]
    starship_class: string
    url: string
}

export interface Settings {
  itemType: any
}