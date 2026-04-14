export const Promociones = () => {
    const promociones = [
        { nombre: "Socio El Telón", beneficio: "15% descuento en boletos", detalles: "Membresía anual", precio: "$500" },
        { nombre: "2x1 con Banco A", beneficio: "Compra 1 entrada, lleva 2", detalles: "Válido todos los lunes", precio: "Gratis" },
        { nombre: "Combo Dulce", beneficio: "20% off en snacks", detalles: "Compra por $100+", precio: "Automático" },
        { nombre: "Noche de Estrenos", beneficio: "Entrada a precio especial", detalles: "Jueves exclusivos", precio: "$100" },
        { nombre: "Programa Referidos", beneficio: "Gana crédito por referencia", detalles: "$50 por amigo", precio: "Ilimitado" },
        { nombre: "Cumpleaños El Telón", beneficio: "Descuento en tu día", detalles: "30% off en todo", precio: "Solo cumpleaños" },
    ];
    
    return (
        <div className="page">
            <div className="page-header">
                <h1>Promociones Especiales</h1>
                <p>Beneficios exclusivos para nuestros clientes</p>
            </div>
            
            <div className="content-grid">
                {promociones.map((promo, index) => (
                    <div key={index} className="card">
                        <h3>{promo.nombre}</h3>
                        <p><strong>{promo.beneficio}</strong></p>
                        <p>{promo.detalles}</p>
                        <button className="btn btn-primary">Más información</button>
                    </div>
                ))}
            </div>
        </div>
    );
}