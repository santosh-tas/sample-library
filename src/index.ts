import * as express from 'express';
import { Request, Response } from "express";
import * as path from 'path';
import router from './routes';
import * as bodyParser from "body-parser"

class App {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    public app: express.Application;
    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'jade');
        this.app.use('/static', express.static(__dirname + '/Public'));
    }
    private routes(): void {
        this.app.use("/", router);
    }
}

export default new App().app