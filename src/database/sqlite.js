const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const DB_FILE = process.env.SQLITE_DB_FILE || path.join(__dirname, '../../data/livraria.db');
console.log("📌 Caminho do banco:", DB_FILE);

// Cria a pasta se não existir
fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });

let db;

// Singleton function to get database instance
function getDb() {
    if (!db) {
        db = new Database(DB_FILE);
        // Ativa WAL mode para melhor performance
        db.pragma('journal_mode = WAL');
        db.pragma('foreign_keys = ON');
    }
    return db;
}

function run(sql, params = []) {
    return getDb().prepare(sql).run(...params);
}

function get(sql, params = []) {
    return getDb().prepare(sql).get(...params);
}

function all(sql, params = []) {
    return getDb().prepare(sql).all(...params);
}

function init() {
    // Tabela de livros
    run(`CREATE TABLE IF NOT EXISTS livros (
                                               id INTEGER PRIMARY KEY AUTOINCREMENT,
                                               titulo TEXT NOT NULL,
                                               autor TEXT NOT NULL,
                                               categoria TEXT NOT NULL,
                                               ano INTEGER NOT NULL
         )`);

    // Tabela de usuários - NOME CORRETO: password (não password_hash)
    run(`
        CREATE TABLE IF NOT EXISTS users (
                                             id INTEGER PRIMARY KEY AUTOINCREMENT,
                                             username TEXT NOT NULL UNIQUE,
                                             email TEXT,
                                             password TEXT NOT NULL,
                                             created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);


    console.log('Banco de dados SQLite inicializado');
}

// Fecha a conexão com o banco (útil em testes ou shutdown)
function close() {
    if (db) {
        db.close();
        db = null;
    }
}

module.exports = {
    getDb,
    run,
    get,
    all,
    init,
    close
};
