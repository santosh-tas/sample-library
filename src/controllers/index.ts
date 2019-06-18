import * as fs from 'fs';
import * as path from 'path';
const fileName = 'bookDetails.json';
class Controllers {
    constructor() {
    }
    public async getAllBooks(): Promise<any> {
        try {
            let bookDetails = await this.getFileContent(fileName);
            return Promise.resolve(JSON.parse(bookDetails));
        } catch (err) {
            return Promise.reject(err);
        }
    }
    public async addNewBook(newBook: any) {
        try {
            let bookDetails = await this.getFileContent(fileName);
            bookDetails = JSON.parse(bookDetails);
            if (newBook.actionType === "updatebook") {
                bookDetails.books.map(function (book: any) {
                    if (book.isbn === newBook.isbn) {
                        book.title = newBook.title
                        book.subtitle = newBook.subtitle
                        book.description = newBook.description
                        book.published = newBook.published
                        book.publisher = newBook.publisher
                        book.author = newBook.author
                    }
                })
                let response = await this.addNewContent(fileName, bookDetails);
                return Promise.resolve(response);
            } else {
                bookDetails.books.push(newBook);
                let response = await this.addNewContent(fileName, bookDetails);
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    public async deleteBook(bookId: string) {
        try {
            let bookDetails = await this.getFileContent(fileName);
            bookDetails = JSON.parse(bookDetails);
            let newBookDetails = bookDetails.books.filter((book: any) => book.isbn != bookId)
            let details = {
                books: newBookDetails
            }
            let response = await this.addNewContent(fileName, details);
            return Promise.resolve(response);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    private updateBookDetails() {

    }
    private getFileContent(fileName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.readFile('bookDetails.json', (err: any, result: any) => {
                if (err) { reject(err) }
                else resolve(result);
            })
        })
    }
    private addNewContent(filename: string, bookDetails: {}) {
        return new Promise((resolve, reject) => {

            fs.writeFile('bookDetails.json', JSON.stringify(bookDetails), (err: any) => {
                if (err) { reject(err) }
                else resolve({
                    data: "Added new Book Successfully"
                });
            })
        })
    }
}

export default Controllers;