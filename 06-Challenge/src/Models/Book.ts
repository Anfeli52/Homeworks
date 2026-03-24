export default class Book {
    private name: string;
    private ISBN: string;
    private author: string;
    private editorial: string;

    constructor(name: string, ISBN: string, author: string, editorial: string){
        this.name = name;
        this.ISBN = ISBN;
        this.author = author;
        this.editorial = editorial;
    }

    setName(name: string): void {
        this.name = name;
    }
    setISBN(ISBN: string): void {
        this.ISBN = ISBN;
    }
    setAuthor(author: string): void {
        this.author = author;
    }
    setEditorial(editorial: string): void {
        this.editorial = editorial;
    }

    getName(): string {
        return this.name;
    }
    getISBN(): string {
        return this.ISBN;
    }
    getAuthor(): string {
        return this.author;
    }
    getEditorial(): string {
        return this.editorial;
    }
    
}