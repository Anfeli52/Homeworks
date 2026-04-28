import { useMemo, useState } from "react";
import { CustomGraph } from "../utils/CustonGraph";
import { City } from "../models/City";
import { Person } from "../models/Person";
import { Graph } from "react-d3-graph";

const myConfig = {
    nodeHighlightBehavior: true,
    directed: true,
    node: {
        color: "lightgreen",
        size: 400,
        highlightStrokeColor: "blue",
        labelProperty: "label" as const,
    },
    link: {
        highlightColor: "lightblue",
        markerWidth: 8,
        markerHeight: 8,
    },
    height: 500,
    width: 960,
};

export const Map = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [type, setType] = useState("Ciudad");
    const [city, setCity] = useState("");
    const [cities, setCities] = useState<City[]>([]);
    const [people, setPeople] = useState<Person[]>([]);

    const { graphData, graphInstance } = useMemo(() => {
        const newGraph = new CustomGraph();
        cities.forEach((c) => newGraph.addCity(c));
        people.forEach((p) => newGraph.addPerson(p));

        return { graphData: newGraph.toGraphData(), graphInstance: newGraph };  
    }, [cities, people]);

    const [selectedCityView, setSelectedCityView] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (type === "Ciudad" && name.trim()) {
            const newCity = new City(name);
            setCities((currentCities) => {
                if (currentCities.some((cityTV) => cityTV.name === newCity.name)) {
                    return currentCities;
                }
                return [...currentCities, newCity];
            });
            setName("");
        } else if (type === "Persona" && name.trim() && age > 0 && city) {
            console.log("FUNCIONAAAAAAASSSSSSSSsS??????");
            const id = crypto.randomUUID();
            const newPerson = new Person(id, name, age, city);
            setPeople(cur => [...cur, newPerson]);
            
            setName("");
            setAge(0);
            setCity("");
        }
    };

    return (
        <div className="map-page">
            <div className="map-panel">
                <div className="map-panel__header">
                    <label className="map-label">Tipo</label>
                    <select className="map-select" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="Ciudad">Ciudad</option>
                        <option value="Persona">Persona</option>
                    </select>
                </div>

                <form onSubmit={handleSubmit} className="map-form">
                    {type === "Ciudad" ? (
                        <input className="map-input" type="text" placeholder="Nombre de la ciudad" value={name} onChange={(e) => setName(e.target.value)} />
                    ) : (
                        <>
                            <input className="map-input" type="text" placeholder="Nombre de la persona" value={name} onChange={(e) => setName(e.target.value)} />
                            <input className="map-input" type="number" placeholder="Edad" value={age === 0 ? "" : age} onChange={(e) => setAge(parseInt(e.target.value))} />
                            <select className="map-select" value={city} onChange={(e) => setCity(e.target.value)}>
                                <option value="">Selecciona una ciudad</option>
                                {cities.map((c, index) => (
                                    <option key={index} value={c.name}>{c.name}</option>
                                ))}
                            </select>
                        </>
                    )}
                    <button className="map-button" type="submit" disabled={!name}>Agregar</button>
                </form>
            </div>

            <div className="map-graph-shell">
                {graphData.nodes.length > 0 ? (
                    <Graph 
                        id="graph-id" 
                        data={graphData} 
                        config={myConfig}
                    />
                ) : (
                    <p className="map-empty-state">Agrega ciudades o personas para visualizar el mapa.</p>
                )}

                <div className="map-city-people">
                    <label className="map-label">Ver personas por ciudad</label>
                    <select className="map-select" value={selectedCityView} onChange={(e) => setSelectedCityView(e.target.value)}>
                        <option value="">Selecciona una ciudad</option>
                        {cities.map((c, index) => (
                            <option key={index} value={c.name}>{c.name}</option>
                        ))}
                    </select>

                    {selectedCityView && (
                        <ul className="map-people-list">
                            { (graphInstance.getPeopleByCity(selectedCityView)).map((p) => (
                                <li key={p.id}>{p.name} — {p.age} años</li>
                            )) }
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};