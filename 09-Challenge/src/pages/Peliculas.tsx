export const Peliculas = () => {
    const películas = [
        { título: "Star Wars Episodio III: La Venganza de los Sith", director: "George Lucas", año: 2005 },
        { título: "El Padrino", director: "Francis Ford Coppola", año: 1972 },
        { título: "Avengers: Endgame", director: "Anthony Russo, Joe Russo", año: 2019 },
    ];
    
    return (
        <div className="page">
            <div className="page-header">
                <h1>Películas en Cartelera</h1>
                <p>Descubre nuestra selección actual de películas</p>
            </div>
            
            <div className="content-grid">
                {películas.map((película, index) => (
                    <div key={index} className="card">
                        <h3>{película.título}</h3>
                        <p><strong>Director:</strong> {película.director}</p>
                        <p><strong>Año:</strong> {película.año}</p>
                        <button className="btn btn-primary">Comprar Entrada</button>
                    </div>
                ))}
            </div>
        </div>
    );
}