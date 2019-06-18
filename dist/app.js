"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const port = process.env.port ? process.env.port : '8081';
index_1.default.listen(port, function () {
    console.log("Server started at port", port);
});
