"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const fileName = 'bookDetails.json';
class Controllers {
    constructor() {
    }
    async getAllBooks() {
        try {
            let bookDetails = await this.getFileContent(fileName);
            return Promise.resolve(JSON.parse(bookDetails));
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async addNewBook(newBook) {
        try {
            let bookDetails = await this.getFileContent(fileName);
            bookDetails = JSON.parse(bookDetails);
            if (newBook.actionType === "updatebook") {
                bookDetails.books.map(function (book) {
                    if (book.isbn === newBook.isbn) {
                        book.title = newBook.title;
                        book.subtitle = newBook.subtitle;
                        book.description = newBook.description;
                        book.published = newBook.published;
                        book.publisher = newBook.publisher;
                        book.author = newBook.author;
                    }
                });
                let response = await this.addNewContent(fileName, bookDetails);
                return Promise.resolve(response);
            }
            else {
                bookDetails.books.push(newBook);
                let response = await this.addNewContent(fileName, bookDetails);
                return Promise.resolve(response);
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    async deleteBook(bookId) {
        try {
            let bookDetails = await this.getFileContent(fileName);
            bookDetails = JSON.parse(bookDetails);
            let newBookDetails = bookDetails.books.filter((book) => book.isbn != bookId);
            let details = {
                books: newBookDetails
            };
            let response = await this.addNewContent(fileName, details);
            return Promise.resolve(response);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    updateBookDetails() {
    }
    getFileContent(fileName) {
        return new Promise((resolve, reject) => {
            fs.readFile(path.resolve(__dirname, 'bookDetails.json'), (err, result) => {
                if (err) {
                    reject(err);
                }
                else
                    resolve(result);
            });
        });
    }
    addNewContent(filename, bookDetails) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.resolve(__dirname, 'bookDetails.json'), JSON.stringify(bookDetails), (err) => {
                if (err) {
                    reject(err);
                }
                else
                    resolve({
                        data: "Added new Book Successfully"
                    });
            });
        });
    }
}
exports.default = Controllers;
