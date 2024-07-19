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
exports.LivroController = void 0;
const LivroService_1 = require("../service/LivroService");
class LivroController {
    constructor() {
        this.livroService = new LivroService_1.LivroService();
    }
    criar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livro = yield this.livroService.criar(req.body);
                res.status(201).json(livro);
            }
            catch (error) {
                if (error.message.includes("ISBN já existe")) {
                    res.status(409).json({ erro: error.message });
                }
                else {
                    res.status(400).json({ erro: error.message });
                }
            }
        });
    }
    consultarTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livros = yield this.livroService.consultarTodos();
                res.status(200).json(livros);
            }
            catch (error) {
                res.status(500).json({ erro: error.message });
            }
        });
    }
    consultarPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const livro = yield this.livroService.consultarPorId(Number(req.params.id));
                if (!livro) {
                    res.status(404).json({ erro: "Livro não encontrado" });
                }
                else {
                    res.status(200).json(livro);
                }
            }
            catch (error) {
                res.status(500).json({ erro: error.message });
            }
        });
    }
    atualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.livroService.atualizar(Number(req.params.id), req.body);
                res.status(200).json(yield this.livroService.consultarPorId(Number(req.params.id)));
            }
            catch (error) {
                if (error.message.includes("não encontrado")) {
                    res.status(404).json({ erro: error.message });
                }
                else {
                    res.status(400).json({ erro: error.message });
                }
            }
        });
    }
    excluir(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.livroService.excluir(Number(req.params.id));
                res.status(200).json({ message: "Book deleted successfully" });
            }
            catch (error) {
                if (error.message.includes("não encontrado")) {
                    res.status(404).json({ erro: error.message });
                }
                else {
                    res.status(400).json({ erro: error.message });
                }
            }
        });
    }
}
exports.LivroController = LivroController;
