"use strict";
var __importDefault = (this && window.__importDefault) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (let k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TarefasController = void 0;
const tarefas_services_1 = require("../services/tarefas.services");
const prisma_repository_1 = __importDefault(require("../database/prisma.repository"));

//Controller responsável pelas operações com as tarefas
class TarefasController {
// Criar uma nova tarefa
    async CriarTarefa(req, res) {
        const { titulo, descricao } = req.body;
        try {
            await tarefas_services_1.TarefaService.create({ titulo, descricao });
            return res.status(201).send({
                ok: true,
                message: "SUA TAREFA FOI CRIADA COM SUCESSO!",
            });
        }
        catch (error) {
            return res.status(500).send({
                ok: false,
                message: error.message,
            });
        }
    }

    // Retorna todas as tarefas cadastradas
    async ListarTarefas(req, res) {
        try {
            const result = await prisma_repository_1.default.tarefas.findMany();
            return res.status(201).send({
                ok: true,
                message: "A(S) TAREFA(S) LISTADAS COM SUCESSO",
                data: result,
            });
        }
        catch (error) {
            return res.status(500).send(error.toString());
        }
    }
    // Processo para atualizar uma tarefa
    async AtualizarTarefa(req, res) {
        const { id } = req.params;
        const { titulo, descricao } = req.body;
        try {
            await prisma_repository_1.default.tarefas.update({
                where: { id },
                data: { titulo, descricao },
            });
            return res.status(200).send({
                ok: true,
                message: "A(S) TAREFA(S) FORAM ATUALIZADAS COM SUCESSO!",
            });
        }
        catch (error) {
            if (error instanceof Error && error.name === "ERRO: A(S) TAREFA(S) NÃO FORAM ENCONTRADAS") {
                return res.status(404).send({
                    ok: false,
                    message: "Tarefa não encontrada",
                });
            }
            return res.status(500).send({
                ok: false,
                message: error.message,
            });
        }
    }
    // Processo para excluir uma tarefa
    async ExcluirTarefa(req, res) {
        const { id } = req.params;
        try {
            await prisma_repository_1.default.tarefas.delete({ where: { id } });
            return res.status(201).send({
                ok: true,
                message: "A(S) TAREFA(S) FORAM EXCLUIDAS COM SUCESSO!",
            });
        }
        catch (error) {
            if (error instanceof Error && error.name === "ERRO: A(S) TAREFA(S) NÃO FORAM ENCONTRADAS") {
                return res.status(404).send({
                    ok: false,
                    message: "A(S) TAREFA(S) NAO FORAM ENCONTRADAS",
                });
            }
            return res.status(500).send({
                ok: false,
                message: error.message,
            });
        }
    }
}
exports.TarefasController = TarefasController;
