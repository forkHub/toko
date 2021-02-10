"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FStorage {
    constructor() {
        this.admin = require("firebase-admin");
        this.serviceAccount = require("../firebase.json");
    }
    init() {
        //TODO: storage bucket di taruh di environment
        this.admin.initializeApp({
            credential: this.admin.credential.cert(this.serviceAccount),
            storageBucket: "blog-1513057469147.appspot.com"
        });
        console.log(this.admin.storage().bucket().upload);
    }
    async hapus(filename) {
        console.log('hapus file ' + filename);
        await this.admin.storage().bucket().file(filename).delete().catch(() => {
            console.error;
        });
    }
    async uploadFile(filename, destination) {
        console.log('upload file ' + filename + '/destination: ' + destination);
        // Uploads a local file to the bucket
        await this.admin.storage().bucket().upload(filename, {
            // By setting the option `destination`, you can change the name of the
            destination: destination,
            // object you are uploading to a bucket.
            metadata: {
                // Enable long-lived HTTP caching headers
                // Use only if the contents of the file will never change
                // (If the contents will change, use cacheControl: 'no-cache')
                cacheControl: 'public, max-age=31536000',
            },
        });
        await this.admin.storage().bucket().file(destination).makePublic();
        return "https://storage.googleapis.com/blog-1513057469147.appspot.com/" + destination;
    }
}
exports.fstorage = new FStorage();
