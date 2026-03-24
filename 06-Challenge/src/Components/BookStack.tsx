import type Stack from "../Utils/Stack";

interface Props {
    stackedBooks: Stack;
}

function BookStack({ stackedBooks }: Props) {

    return (
        <div className="book-stack">
            {stackedBooks && !stackedBooks.isEmpty() ? (
                stackedBooks.items.map((book, idx) => (
                    <div key={idx} className="book-item">
                        <h4>
                            {book.getName()}
                        </h4>
                        <p >ISBN: {book.getISBN()}</p>
                        <p >Autor: {book.getAuthor()}</p>
                        <p >Editorial: {book.getEditorial()}</p>
                    </div>
                ))
            ) : (
                <p>No hay libros aún</p>
            )}
        </div>
    );
}

export default BookStack;
