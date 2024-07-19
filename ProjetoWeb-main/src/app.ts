import express from "express";
import { LivroController } from "./controller/LivroController";

const app = express();
const livroController = new LivroController();

app.use(express.json());

app.post("/livros", (req, res) => livroController.criar(req, res));
app.get("/livros", (req, res) => livroController.consultarTodos(req, res));
app.get("/livros/:id", (req, res) => livroController.consultarPorId(req, res));
app.put("/livros/:id", (req, res) => livroController.atualizar(req, res));
app.delete("/livros/:id", (req, res) => livroController.excluir(req, res));

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
