import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { Livro } from '../models/Livro';
import pool from '../database/mysql';

export class LivroRepository {
  // Cria um novo livro
  async criar(livro: Livro): Promise<Livro> {
    const [result] = await pool.query<ResultSetHeader>('INSERT INTO livros (titulo, autor, dataPublicacao, isbn, paginas, idioma, editora) VALUES (?, ?, ?, ?, ?, ?, ?)', [
      livro.title,
      livro.author,
      livro.publishedDate,
      livro.isbn,
      livro.pages,
      livro.language,
      livro.publisher
    ]);

    const insertId = result.insertId;
    return { ...livro, id: insertId };
  }

  // Consulta todos os livros
  async consultarTodos(): Promise<Livro[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM livros');
    return rows as Livro[];
  }

  // Consulta um livro por ID
  async consultarPorId(id: number): Promise<Livro | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM livros WHERE id = ?', [id]);
    const livros = rows as Livro[];
    return livros.length > 0 ? livros[0] : null;
  }

  // Consulta um livro por ISBN
  async consultarPorIsbn(isbn: string): Promise<Livro | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM livros WHERE isbn = ?', [isbn]);
    const livros = rows as Livro[];
    return livros.length > 0 ? livros[0] : null;
  }

  // Atualiza um livro existente
  async atualizar(id: number, livro: Partial<Livro>): Promise<void> {
    await pool.query('UPDATE livros SET titulo = ?, autor = ?, dataPublicacao = ?, isbn = ?, paginas = ?, idioma = ?, editora = ? WHERE id = ?', [
        livro.title,
        livro.author,
        livro.publishedDate,
        livro.isbn,
        livro.pages,
        livro.language,
        livro.publisher,
      id
    ]);
  }

  // Exclui um livro pelo ID
  async excluir(id: number): Promise<void> {
    await pool.query('DELETE FROM livros WHERE id = ?', [id]);
  }
}
