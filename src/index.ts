import { TarefasController } from "./controllers/tarefas.controller";
import cors from 'cors';
import express from "express";

const app = express();
app.use(express.json());
app.use(cors());

const tarefasController = new TarefasController();

app.post("/tarefas", tarefasController.CriarTarefa);

app.get("/tarefas", tarefasController.ListarTarefas);

app.put("/:id", tarefasController.AtualizarTarefa);

app.delete("/:id", tarefasController.ExcluirTarefa);

app.listen(3333, () => {
    console.log ("TAREFAS rodando -  http://localhost:3333");
});