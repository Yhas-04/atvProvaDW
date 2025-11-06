const fs = require("fs");
const path = require("path");
const RepositoryBase = require("./repository.interface");
const Livro = require("../models/livro.model");
const db = require("../database/sqlite");

class LivrosRepository {

async findAll() {
const rows = await db.all("SELECT id, titulo, autor, categoria, ano FROM livros ORDER BY id ASC");
return rows.map(r => Livro.fromJSON(r));
}
async findById(id) {
const row = await db.get("SELECT id, titulo, autor, categoria, ano FROM livros WHERE id = ?", [id]);
return row ? Livro.fromJSON(row) : null;
}
async create(data) {
const novo = new Livro({ id: null, ...data });
const res = await db.run(
"INSERT INTO livros (titulo, autor, categoria, ano) VALUES (?, ?, ?, ?)",
[novo.titulo, novo.autor, novo.categoria, novo.ano]
);
return this.findById(res.id);
}

async updateLivro(id, dados) {
  const statement = new Livro({ id, ...dados });
  await db.run(
    "UPDATE livros SET titulo = ?, autor = ?, categoria = ?, ano = ? WHERE id = ?",
    [statement.titulo, statement.autor, statement.categoria, statement.ano, id]
  );
  return this.findById(id);
}

async deleteLivro(id) {
  const existente = await this.findById(id);
  if (!existente) {
    const error = new Error("Livro não encontrado");
    error.statusCode = 404;
    throw error;
  }
  await db.run("DELETE FROM livros WHERE id = ?", [id]);
}

async _saveToFile(data) {
    fs.writeFileSync(this.caminhoArquivo, JSON.stringify(data, null, 2), "utf8");
  }

  async _lerArquivo() {
    return await fs.promises.readFile(this.caminhoArquivo, "utf8");
  }
}

module.exports = LivrosRepository;
