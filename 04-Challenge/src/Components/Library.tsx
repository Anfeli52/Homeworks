import { useState } from "react";
import Book from "../Models/Book";
import Stack from "../Utils/Stack";
import BookStack from "./BookStack";

function Library() {

    const [booksName, setBooksName] = useState("");
    const [ISBN, setISBN] = useState("");
    const [author, setAuthor] = useState("");
    const [editorial, setEditorial] = useState("");

    const [stack, setStack] = useState<Stack>(new Stack());

    const addBook = () => {
        if(booksName.trim().length === 0 || ISBN.trim().length === 0 || author.trim().length === 0 || editorial.trim().length === 0){
            alert('Por favor, no deje espacios sin completar');
            return;
        }

        const newBook = new Book(booksName, ISBN, author, editorial);
        const newStack = new Stack();
        stack.items.forEach(book => newStack.push(book));

        const existedISBN = stack.items.find((book) => book.getISBN() == ISBN);

        if(existedISBN) {
            alert('Este ISBN ya existe');
            return;
        }

        newStack.push(newBook);
        setStack(newStack);
    }

    const popLastBook = () => {
        const newStack = new Stack();
        const poppedBook = stack.pop();

        if(poppedBook) {
            stack.items.forEach(book => newStack.push(book));
            setStack(newStack);
        } else {
            alert('No hay libros para alquilar');
            return;
        }
    }

    return (
        <div className="library-container">
            <form className="new-book-form">
                <label>Nombre del Libro: <input type="text" name="bookName" onChange={(e) => setBooksName(e.target.value)}/></label>
                <label>ISBN: <input type="number" name="ISBN" onChange={(e) => setISBN(e.target.value)}/></label>
                <label>Author: <input type="text" name="authorName" onChange={(e) => setAuthor(e.target.value)}/></label>
                <label>Editorial: <input type="text" name="editorial" onChange={(e) => setEditorial(e.target.value)}/></label>

                <div className="action-buttons">
                    <button type="button" onClick={ addBook }> Agregar Libro </button>
                    <button type="button" onClick={ popLastBook }> Alquilar Último Libro </button>
                </div>
            </form>

            <BookStack stackedBooks={ stack }/>

        </div>
    );
}

export default Library;