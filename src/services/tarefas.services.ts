import repository from "../database/prisma.repository";
import { Tarefa } from "../models/Tarefa.model";
import { CriarTarefaDTO } from "../contracts/tarefas.contracts";
import { Result } from "../contracts/result.contracts";

export class TarefaService {

    //Criar uma nova tarefa no banco de dados
    public async create(data: CriarTarefaDTO): Promise<Result> {
      const { ok, code, message } = this.validateInput(data);

      if (!ok) {
        return { ok, code, message };
      }

      const tarefa = new Tarefa(data.titulo, data.descricao);

      const result = await repository.tarefas.create({ data: tarefa });

      return { ok: true, code: 201, message: 'A TAREFA FOI CADASTRADA COM SUCESSO', data: result };
    }

    // Irá validar o campo título da tarefa
    private validateInput(data: CriarTarefaDTO): Result {
      if (!data.titulo) {
        return {
          ok: false,
          code: 400,
          message: 'Insira uma tarefa',
        };
      }

      if (data.titulo.length < 3 || data.titulo.length > 30) {
        return {
          ok: false,
          code: 400,
          message: 'ERRO: TAREFA DEVE CONTER DE 3 A 30 CARACTERES',
        };
      }

      return {
        ok: true,
        code: 200,
        message: 'A VALIDAÇÃO FOI REALIZADA COM SUCESSO!',
      };
    }
  }
