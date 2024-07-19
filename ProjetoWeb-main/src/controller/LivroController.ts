import { Request, Response } from "express";
import { LivroService } from "../service/LivroService";

export class LivroController {
  private livroService = new LivroService();

  async criar(req: Request, res: Response): Promise<void> {
    try {
      const livro = await this.livroService.criar(req.body);
      res.status(201).json(livro);
    } catch (error: any) {
      if (error.message.includes("ISBN já existe")) {
        res.status(409).json({ erro: error.message });
      } else {
        res.status(400).json({ erro: error.message });
      }
    }
  }

  async consultarTodos(req: Request, res: Response): Promise<void> {
    try {
      const livros = await this.livroService.consultarTodos();
      res.status(200).json(livros);
    } catch (error: any) {
      res.status(500).json({ erro: error.message });
    }
  }

  async consultarPorId(req: Request, res: Response): Promise<void> {
    try {
      const livro = await this.livroService.consultarPorId(Number(req.params.id));
      if (!livro) {
        res.status(404).json({ erro: "Livro não encontrado" });
      } else {
        res.status(200).json(livro);
      }
    } catch (error: any) {
      res.status(500).json({ erro: error.message });
    }
  }

  async atualizar(req: Request, res: Response): Promise<void> {
    try {
      await this.livroService.atualizar(Number(req.params.id), req.body);
      res.status(200).json(await this.livroService.consultarPorId(Number(req.params.id)));
    } catch (error: any) {
      if (error.message.includes("não encontrado")) {
        res.status(404).json({ erro: error.message });
      } else {
        res.status(400).json({ erro: error.message });
      }
    }
  }

  async excluir(req: Request, res: Response): Promise<void> {
    try {
      await this.livroService.excluir(Number(req.params.id));
      res.status(200).json({ message: "Book deleted successfully" });
    } catch (error: any) {
      if (error.message.includes("não encontrado")) {
        res.status(404).json({ erro: error.message });
      } else {
        res.status(400).json({ erro: error.message });
      }
    }
  }
}
