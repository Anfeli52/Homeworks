export const Dulceria = () => {
    const productos = [
        { nombre: "Combo Clásico", descripción: "Crispetas + gaseosa mediana", precio: "$28.500" },
        { nombre: "Combo Premium", descripción: "Crispetas grandes + 2 gaseosas grandes + 2 Perros Calientes", precio: "$65.500" },
        { nombre: "Combo Personal", descripción: "Crispetas pequeñas + gaseosa pequeña", precio: "$14.500" },
        { nombre: "Combo Familiar", descripción: "3 Crispetas grandes + 3 gaseosas grandes", precio: "$145.000" },
    ];
    
    return (
        <div className="page">
            <div className="page-header">
                <h1>Dulcería de El Telón</h1>
                <p>Snacks deliciosos para complementar tu experiencia</p>
            </div>
            
            <div className="content-grid">
                {productos.map((producto, index) => (
                    <div key={index} className="card">
                        <h3>{producto.nombre}</h3>
                        <p>{producto.descripción}</p>
                        <p><strong>Precio:</strong> <span className="highlight">{producto.precio}</span></p>
                        <button className="btn btn-primary">Agregar al carrito</button>
                    </div>
                ))}
            </div>
        </div>
    );
}