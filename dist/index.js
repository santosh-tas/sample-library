"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const routes_1 = require("./routes");
const bodyParser = require("body-parser");
class App {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'jade');
        this.app.use('/static', express.static(__dirname + '/Public'));
    }
    routes() {
        this.app.use("/", routes_1.default);
    }
}
exports.default = new App().app;
