import { Router, Request, Response } from 'express';
import controllers from '../controllers'

class Routes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.init();
    }
    private init(): void {
        this.router.get('/', this.renderPage)
        this.router.get('/getallbooks', this.getallbooks)
        this.router.post('/add', this.addNewBook)
        this.router.post('/delete', this.deleteBook)
    }
    private renderPage(req: Request, res: Response): void {
        res.render('index')
    }
    private async getallbooks(req: Request, res: Response): Promise<any> {
        let controller = new controllers();
        try {
            let bookDetails = await controller.getAllBooks();
            res.status(200).send(bookDetails);
        } catch (err) {
            console.log(err);
            res.status(500).send({
                mesaage: "Something is not right"
            });
        }
    }
    private async addNewBook(req: Request, res: Response): Promise<any> {
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
        let controller = new controllers();
        try {
            let bookDetails = await controller.addNewBook(newBook);
            res.status(200).send(bookDetails);
        } catch (err) {
            res.status(500).send({
                mesaage: "Something is not right"
            });
        }
    }
    private async deleteBook(req: Request, res: Response): Promise<any> {
        let bookId = req.body.bookId;
        let controller = new controllers();
        try {
            let bookDetails = await controller.deleteBook(bookId);
            res.status(200).send(bookDetails);
        } catch (err) {
            res.status(500).send({
                mesaage: "Something is not right"
            });
        }
    }



}

export default new Routes().router