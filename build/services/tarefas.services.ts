"use strict";
var __importDefault = (this && window.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TarefaService = void 0;
const prisma_repository_1 = __importDefault(require("../database/prisma.repository"));
const Tarefa_model_1 = require("../models/Tarefa.model");
class TarefaService {
    async criar(data) {
        if (!data.titulo || data.titulo.length < 4) {
            return {
                ok: false,
                message: "TAREFA INVALIDA: INSERIR UMA TAREFA VÁLIDA",
                code: 400,
            };
        }
        if (data.titulo.length > 30) {
            return {
                ok: false,
                message: "ERRO: O TÍTULO SÓ PODE TER NO MÃXIMO 30 CARACTERES",
                code: 400,
            };
        }
        const tarefa = { titulo: data.titulo, descricao: data.descricao };
        const result = await prisma_repository_1.default.tarefas.create({ data: tarefa });
        return {
            ok: true,
            message: "A TAREFA FOI CRIADA COM SUCESSO!",
            code: 201,
            data: result,
        };
    }
}
exports.TarefaService = TarefaService;

