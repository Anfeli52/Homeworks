export const Preventa = () => {
    const preventas = [
        { evento: "La Posesión De La Momia", descriptor: "películas icónicas", precio: "$12.000", stock: "Disponible" },
        { evento: "Michael", descriptor: "lo mejor del género", precio: "$12.000", stock: "Agotado" },
        { evento: "Llueve Sobre Babel", descriptor: "evento exclusivo", precio: "$12.000", stock: "Pocas entradas" },
    ];
    
    return (
        <div className="page">
            <div className="page-header">
                <h1>Preventa de Boletos</h1>
                <p>Asegura tus entradas para los mejores eventos</p>
            </div>
            
            <div className="content-grid">
                {preventas.map((preventa, index) => (
                    <div key={index} className="card">
                        <h3>{preventa.evento}</h3>
                        <p>{preventa.descriptor}</p>
                        <p><strong>Precio:</strong> <span className="highlight">{preventa.precio}</span></p>
                        <p><strong>Estado:</strong> {preventa.stock}</p>
                        <button className="btn btn-primary" disabled={preventa.stock === "Agotado"}>
                            {preventa.stock === "Agotado" ? "Agotado" : "Comprar"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}