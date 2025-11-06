const LivrosRepository = require("../repositories/livros.repository");

class LivrosController {
  constructor() {
    this.repository = new LivrosRepository();
  }

  async listarLivros(req, res, next) {
    try {
      const livros = await this.repository.findAll();
      res.status(200).json(livros);
    } catch (error) {
      next(error);
    }
  }

  async buscarLivroPorId(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const livro = await this.repository.findById(id);
      if (!livro) {
        return res.status(404).json({ erro: "Livro não encontrado" });
      }
      res.status(200).json(livro);
    } catch (error) {
      next(error);
    }
  }

  async criarLivro(req, res, next) {
    try {
      const { titulo, autor, categoria, ano } = req.body;
      const novoLivro = await this.repository.create({
        titulo,
        autor,
        categoria,
        ano: parseInt(ano)
      });
      res.status(201).json({
        mensagem: "Livro criado com sucesso",
        data: novoLivro
      });
    } catch (error) {
      next(error);
    }
  }

  async atualizarLivro(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const dados = req.body;
      const livroAtualizado = await this.repository.update(id, dados);
      res.status(200).json({
        mensagem: "Livro atualizado com sucesso",
        data: livroAtualizado
      });
    } catch (error) {
      next(error);
    }
  }

  async removerLivro(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const livroRemovido = await this.repository.delete(id);
      res.status(200).json({
        mensagem: "Livro removido com sucesso",
        data: livroRemovido
      });
    } catch (error) {
      next(error);
    }
  }
  
}

module.exports = LivrosController;
