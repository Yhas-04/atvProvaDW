
// src/routes/index.js
const express = require("express");
const router = express.Router();
// Rotas de livros
const livrosRoutes = require("./livros.routes");
const authRoutes = require("./auth.routes");
// Rota inicial (explicação do sistema)
router.get("/", (req, res) => {
 res.status(200).json({
 mensagem: "Bem-vindo à API da Livraria! Use /livros para gerenciar os livros.",
 });
});
// Usa as rotas de livros
router.use("/livros", livrosRoutes);
router.use("/auth", authRoutes);
module.exports = router;