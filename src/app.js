const app = require("./config/express");
const db = require("./database/sqlite");
 // garante que a tabela exista antes das rotas

db.init();

console.log(db.all("PRAGMA table_info(users);"));


const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler.js");
app.use("/api", routes);
app.use(errorHandler);

// Handler para rotas não encontradas (404)
app.use((req, res) => {
 res.status(404).json({ erro: "Endpoint não encontrado" });
});
module.exports = app;
