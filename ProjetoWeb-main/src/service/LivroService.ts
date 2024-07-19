import { LivroRepository } from "../repository/LivroRepository";
import { Livro } from "../models/Livro";

export class LivroService {
  private livroRepository = new LivroRepository();

  async criar(livro: Livro): Promise<Livro> {
    const livroExistente = await this.livroRepository.consultarPorIsbn(livro.isbn);
    if (livroExistente) {
      throw new Error("Livro com este ISBN já existe");
    }
    return this.livroRepository.criar(livro);
  }
  

  async consultarTodos(): Promise<Livro[]> {
    return this.livroRepository.consultarTodos();
  }

  async consultarPorId(id: number): Promise<Livro | null> {
    return this.livroRepository.consultarPorId(id);
  }

  async atualizar(id: number, livro: Partial<Livro>): Promise<void> {
    const livroExistente = await this.livroRepository.consultarPorId(id);
    if (!livroExistente) {
      throw new Error("Livro não encontrado");
    }
    await this.livroRepository.atualizar(id, livro);
  }

  async excluir(id: number): Promise<void> {
    const livroExistente = await this.livroRepository.consultarPorId(id);
    if (!livroExistente) {
      throw new Error("Livro não encontrado");
    }
    await this.livroRepository.excluir(id);
  }
}
