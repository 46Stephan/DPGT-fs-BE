"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tarefa = void 0;
const crypto_1 = require("crypto");
class Tarefa {
    titulo;
    descricao;
    id;
    constructor(titulo, descricao) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.id = (0, crypto_1.randomUUID)();
    }
}
exports.Tarefa = Tarefa;
