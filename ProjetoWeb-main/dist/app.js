"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LivroController_1 = require("./controller/LivroController");
const app = (0, express_1.default)();
const livroController = new LivroController_1.LivroController();
app.use(express_1.default.json());
app.post("/livros", (req, res) => livroController.criar(req, res));
app.get("/livros", (req, res) => livroController.consultarTodos(req, res));
app.get("/livros/:id", (req, res) => livroController.consultarPorId(req, res));
app.put("/livros/:id", (req, res) => livroController.atualizar(req, res));
app.delete("/livros/:id", (req, res) => livroController.excluir(req, res));
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
