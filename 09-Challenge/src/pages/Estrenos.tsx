export const Estrenos = () => {
    const estrenos = [
        { título: "Instinto Implacable", fecha: "14 de Abril", descripción: "La vida pacífica de Nikki, una ex heroína de guerra, se ve destrozada cuando su hija es secuestrada. Inmersa en el submundo criminal mientras es perseguida por policías y militares, debe luchar para rescatar a su hija." },
        { título: "El Drama", fecha: "14 de Abril", descripción: "Los planes de boda perfectos de una pareja se convierten en caos cuando un impactante secreto sale a la luz días antes de la ceremonia." },
        { título: "Super Mario Galaxy: La Película", fecha: "14 de Abril", descripción: "Mario y Luigi salen del Reino Champiñón para una aventura intergaláctica. Esta vez, la batalla se traslada al espacio y Bowser Jr será quien se les cruce en el camino. Con aliados inesperados, el destino del universo queda en juego." },
    ];
    
    return (
        <div className="page">
            <div className="page-header">
                <h1>Estrenos de la Semana</h1>
                <p>Nuevas películas próximamente</p>
            </div>
            
            <div className="content-grid">
                {estrenos.map((estreno, index) => (
                    <div key={index} className="card">
                        <h3>{estreno.título}</h3>
                        <p><strong>Fecha:</strong> <span className="highlight">{estreno.fecha}</span></p>
                        <p>{estreno.descripción}</p>
                        <button className="btn btn-primary">Pre-reservar</button>
                    </div>
                ))}
            </div>
        </div>
    );
}