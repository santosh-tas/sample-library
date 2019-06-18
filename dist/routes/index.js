"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
class Routes {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get('/', this.renderPage);
        this.router.get('/getallbooks', this.getallbooks);
        this.router.post('/add', this.addNewBook);
        this.router.post('/delete', this.deleteBook);
    }
    renderPage(req, res) {
        res.render('index');
    }
    async getallbooks(req, res) {
        let controller = new controllers_1.default();
        try {
            let bookDetails = await controller.getAllBooks();
            res.status(200).send(bookDetails);
        }
        catch (err) {
            console.log(err);
            res.status(500).send({
                mesaage: "Something is not right"
            });
        }
    }
    async addNewBook(req, res) {
        let isbn = req.body.isbn;
        let title = req.body.title;
        let subtitle = req.body.subtitle;
        let author = req.body.author;
        let published = req.body.published;
        let publisher = req.body.publisher;
        let pages = req.body.pages;
        let description = req.body.description;
        let website = req.body.website;
        let actionType = req.body.actionType;
        let newBook = {
            isbn, title, subtitle, author, published, publisher, pages, description, website, actionType
        };
        let controller = new controllers_1.default();
        try {
            let bookDetails = await controller.addNewBook(newBook);
            res.status(200).send(bookDetails);
        }
        catch (err) {
            res.status(500).send({
                mesaage: "Something is not right"
            });
        }
    }
    async deleteBook(req, res) {
        let bookId = req.body.bookId;
        let controller = new controllers_1.default();
        try {
            let bookDetails = await controller.deleteBook(bookId);
            res.status(200).send(bookDetails);
        }
        catch (err) {
            res.status(500).send({
                mesaage: "Something is not right"
            });
        }
    }
}
exports.default = new Routes().router;
