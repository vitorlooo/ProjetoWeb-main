"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRepository = void 0;
const mysql_1 = __importDefault(require("../database/mysql"));
class LivroRepository {
    // Cria um novo livro
    criar(livro) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield mysql_1.default.query('INSERT INTO livros (titulo, autor, dataPublicacao, isbn, paginas, idioma, editora) VALUES (?, ?, ?, ?, ?, ?, ?)', [
                livro.title,
                livro.author,
                livro.publishedDate,
                livro.isbn,
                livro.pages,
                livro.language,
                livro.publisher
            ]);
            const insertId = result.insertId;
            return Object.assign(Object.assign({}, livro), { id: insertId });
        });
    }
    // Consulta todos os livros
    consultarTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield mysql_1.default.query('SELECT * FROM livros');
            return rows;
        });
    }
    // Consulta um livro por ID
    consultarPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield mysql_1.default.query('SELECT * FROM livros WHERE id = ?', [id]);
            const livros = rows;
            return livros.length > 0 ? livros[0] : null;
        });
    }
    // Consulta um livro por ISBN
    consultarPorIsbn(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield mysql_1.default.query('SELECT * FROM livros WHERE isbn = ?', [isbn]);
            const livros = rows;
            return livros.length > 0 ? livros[0] : null;
        });
    }
    // Atualiza um livro existente
    atualizar(id, livro) {
        return __awaiter(this, void 0, void 0, function* () {
            yield mysql_1.default.query('UPDATE livros SET titulo = ?, autor = ?, dataPublicacao = ?, isbn = ?, paginas = ?, idioma = ?, editora = ? WHERE id = ?', [
                livro.title,
                livro.author,
                livro.publishedDate,
                livro.isbn,
                livro.pages,
                livro.language,
                livro.publisher,
                id
            ]);
        });
    }
    // Exclui um livro pelo ID
    excluir(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield mysql_1.default.query('DELETE FROM livros WHERE id = ?', [id]);
        });
    }
}
exports.LivroRepository = LivroRepository;
