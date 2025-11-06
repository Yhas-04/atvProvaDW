// src/config/express.js
const express = require("express");
const morgan = require("morgan");
const app = express();
// Middleware básicos do Express
app.use(express.json()); // Middleware para interpretar JSON
app.use(express.urlencoded({ extended: true })); // Suporte para dados de formulários
app.use(morgan("combined")); // Logging HTTP

const session = require("express-session");
app.use(session({
 secret: process.env.SESSION_SECRET || "livraria_secret_key",
 rolling: true, // renova a sessão a cada requisição
 cookie: {
 httpOnly: true,
 secure: false, // true apenas em produção HTTPS
 maxAge: 1000 * 60 * 60 * 2 // 2 horas
 }
}));
module.exports = app;
