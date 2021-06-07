"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileRouter_1 = require("./router/FileRouter");
class AppCloudinary {
    login() {
        //TODO: login ke cloudinary
    }
    router(app) {
        app.use('cdn/file', FileRouter_1.fileRouter);
    }
}
exports.appCloudinary = new AppCloudinary();
