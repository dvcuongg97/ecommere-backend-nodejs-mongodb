'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

const _POOLSIZE = process.env.DB_POOLSIZE || 50;
const DEBUG_MODE = process.env.DEBUG_MODE || 1;

class Database {
    constructor() {
        this.connect();
    }

    // Connect to MongoDB
    connect() {
        const connectString = process.env.DB_CONNECT_STRING;

        if (!connectString) {
            console.error('Connection string is missing!');
            process.exit(1); // Thoát ứng dụng nếu thiếu thông tin kết nối
        }

        if (DEBUG_MODE === 'true') {
            mongoose.set('debug', { color: true });
        }

        mongoose
            .connect(connectString, { maxPoolSize: _POOLSIZE })
            .then(() => console.log('Connected to MongoDB successfully'))
            .catch(err => console.error('Error connecting to MongoDB:', err));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongoDb = Database.getInstance();

module.exports = instanceMongoDb;
