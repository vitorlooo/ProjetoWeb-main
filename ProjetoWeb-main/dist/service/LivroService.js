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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const LivroRepository_1 = require("../repository/LivroRepository");
class LivroService {
    constructor() {
        this.livroRepository = new LivroRepository_1.LivroRepository();
    }
    criar(livro) {
        return __awaiter(this, void 0, void 0, function* () {
            const livroExistente = yield this.livroRepository.consultarPorIsbn(livro.isbn);
            if (livroExistente) {
                throw new Error("Livro com este ISBN já existe");
            }
            return this.livroRepository.criar(livro);
        });
    }
    consultarTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.livroRepository.consultarTodos();
        });
    }
    consultarPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.livroRepository.consultarPorId(id);
        });
    }
    atualizar(id, livro) {
        return __awaiter(this, void 0, void 0, function* () {
            const livroExistente = yield this.livroRepository.consultarPorId(id);
            if (!livroExistente) {
                throw new Error("Livro não encontrado");
            }
            yield this.livroRepository.atualizar(id, livro);
        });
    }
    excluir(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const livroExistente = yield this.livroRepository.consultarPorId(id);
            if (!livroExistente) {
                throw new Error("Livro não encontrado");
            }
            yield this.livroRepository.excluir(id);
        });
    }
}
exports.LivroService = LivroService;
