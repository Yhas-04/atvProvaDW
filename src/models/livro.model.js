class Livro {
  constructor({ id = null, titulo, autor, categoria, ano, editora, numPag }) {
    this.id = id !== undefined ? id : null;
    this.titulo = String(titulo).trim();
    this.autor = String(autor).trim();
    this.categoria = String(categoria).trim();
    this.ano = Number.isInteger(ano) ? ano : parseInt(ano, 10);
    this.editora = String(editora).trim();
    this.numPag = Number.isInterger(numPag) ? numPag : parseInt(numPag, 10);
    this._validar();
  }
  _validar() {
    const erros = [];
    if (!this.titulo || this.titulo.trim().length === 0)
      erros.push("Título é obrigatório");
    if (!this.autor || this.autor.trim().length === 0)
      erros.push("Autor é obrigatório");
    if (!this.categoria || this.categoria.trim().length === 0)
      erros.push("Categoria é obrigatória");
    if (!this.editora || this.editora.trim().length === 0)
      erros.push("editora é obrigatória");
    if (!Number.isInteger(this.ano) || isNaN(this.ano))
      erros.push("Ano deve ser um número válido");
    if (!Number.isInteger(this.numPag) || isNaN(this.numPag))
      erros.push("numPag deve ser um número válido");
    if (erros.length > 0) {
      const error = new Error("Dados inválidos");
      error.statusCode = 400;
      error.details = erros;
      throw error;
    }
  }
  static fromJSON(json) {
    return new Livro({
      id: json.id ?? null,
      titulo: json.titulo,
      autor: json.autor,
      categoria: json.categoria,
      ano: json.ano,
      editora: json.editora,
      numPag: json.numPag,
    });
  }
  toJSON() {
    return {
      id: this.id,
      titulo: this.titulo,
      autor: this.autor,
      categoria: this.categoria,
      ano: this.ano,
      editora: this.editora,
      numPag: this.numPag,
    };
  }
}
module.exports = Livro;
