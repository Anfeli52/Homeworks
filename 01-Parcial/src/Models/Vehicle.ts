class Vehicle {
    marca: string | null;
    model: string | null;
    transmission: string | null;
    year: string | null;
    price: string | null;

    constructor(marca: string, model: string, transmission: string, year: string, price: string){
        this.marca = marca;
        this.model = model;
        this.transmission = transmission;
        this.year = year;
        this.price = price;
    }
}

export default Vehicle;