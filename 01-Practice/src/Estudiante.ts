class Estudiante {
    private name: string;
    private age: number;
    private code: string
    private className: string;

    constructor(name: string, age: number, code: string, className: string){
        this.name = name;
        this.age = age;
        this.code = code;
        this.className = className
    }

    getName(){
        return this.name;
    }
    getAge(){
        return this.age;
    }
    getCode(){
        return this.code;
    }
    getclassName(){
        return this.className;
    }

}

export default Estudiante;