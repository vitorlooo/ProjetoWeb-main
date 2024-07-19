"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const configuracaoBD = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Luppy2020',
    database: 'bancoweb'
};
const pool = promise_1.default.createPool(configuracaoBD);
exports.default = pool;
