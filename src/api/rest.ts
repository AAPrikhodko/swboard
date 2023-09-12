import axios, {AxiosResponse} from 'axios';
import {baseUrl, resources} from "../utils/constants";
import {Dto} from "../services/models";

class RestBase {
    private resource: string;

    constructor(resource: string) {
        this.resource = resource;
        axios.defaults.baseURL = baseUrl
    }

    async getList<T>(page?: number, term?: string): Promise<AxiosResponse<Dto<T>>> {
        return term
            ? axios.get<Dto<T>>(`/${this.resource}/?search=${term}`)
            : page
                ? axios.get<Dto<T>>(`/${this.resource}/?page=${page}`)
                : axios.get<Dto<T>>(`/${this.resource}/`)
    }

    async getListById<T>(id: string) {
        return axios.get<T>(`/${this.resource}/${id}`)
    }

    async updateItemLocally<T> (id: string, item: T) {
        localStorage.setItem(
            `${this.resource}_${id}`,
            JSON.stringify(item)
        )
    }
}

export const RestCharacters = new RestBase(resources.characters as string);
export const RestStarships = new RestBase(resources.starships as string);