import { City } from "../models/City";
import type { Person } from "../models/Person";

export class CustomGraph {
    cities: City[];
    people: Person[];
    adjList: Map<string, Person[]>;

    constructor() {
        this.cities = [];
        this.people = [];
        this.adjList = new Map();
    }

    addCity(city: City): void {
        if (this.cities.some((existingCity) => existingCity.name === city.name)) {
            return;
        }

        this.cities.push(city);
        this.adjList.set(city.name, []);
    }

    addPerson(person: Person): void {
        const cityExists = this.cities.some((city) => city.name === person.city);

        if (!cityExists) {
            this.addCity(new City(person.city));
        }

        this.people.push(person);

        const peopleInCity = this.adjList.get(person.city) ?? [];
        peopleInCity.push(person);
        this.adjList.set(person.city, peopleInCity);
    }

    getPeopleByCity(cityName: string): Person[] {
        return this.adjList.get(cityName) ?? [];
    }

    toGraphData() {
        const nodes = [
            ...this.cities.map((city) => ({
                id: city.name,
                label: city.name,
                type: "city",
            })),
            ...this.people.map((person) => ({
                id: person.id,
                label: "" + person.name + " (" + person.age + " años)",
                type: "person",
            })),
        ];

        const links = this.cities.flatMap((city) =>
            this.getPeopleByCity(city.name).map((person) => ({
                source: city.name,
                target: person.id,
            }))
        );

        return {
            nodes,
            links,
        };
    }
}