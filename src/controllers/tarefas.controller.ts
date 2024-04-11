import { Request, Response } from "express";
import { TarefaService } from "../services/tarefas.services";
import repository from "../database/prisma.repository";

export class TarefasController {
    /**
     * Cria uma nova tarefa
     * @param req 
     * @param res 
     */
    public async CriarTarefa(req: Request, res: Response) {
      try {
        // Recupera os dados da requisição
        const { titulo, descricao } = req.body;

        // Cria uma instância do serviço de tarefas
        const tarefaService = new TarefaService();

        // Chama o método de criação da tarefa e aguarda sua conclusão
        const result = await tarefaService.create({
          titulo,
          descricao,
        });

        // Envia a resposta
        return res.status(result.code).send(result);
      } catch (error: any) {
        // Caso ocorra um erro, envia a mensagem de erro
        return res.status(500).send({
          ok: false,
          message: error.toString(),
        });
      }
    }

    /**
     * Lista todas as tarefas
     *
     * @param req 
     * @param res 
     */
    public async ListarTarefas(req: Request, res: Response) {
        try {
            // Chama o método findMany do repositório e aguarda a conclusão
            const result = await repository.tarefas.findMany();

            // Monta a resposta e envia
            return res.status(201).send({
                ok: true,
                message: "A(S) TAREFA(S)  LISTADAS COM SUCESSO",
                data: result,
            });
        } catch (error: any) {
            // Caso ocorra um erro, envia a mensagem de erro
            return res.status(500).send(error.toString());
        }
    }


      /**
       * Atualiza uma tarefa existente
       *
       * @param req 
       * @param res 
       */
      public async AtualizarTarefa(req: Request, res: Response) {
        try {
          // Recupera os dados da requisição
          const { id } = req.params;
          const { titulo, descricao } = req.body;

          // Valida a tarefa
          if (!titulo || titulo.length < 4) {
            // Retorna um erro caso a tarefa seja inválida
            return res
              .status(400)
              .send({ ok: false, message: "TAFERA INVÁLIDA" });
          }

          // Tenta encontrar a tarefa no banco
          const tarefa = await repository.tarefas.findUnique({ where: { id } });

          // Caso a tarefa não exista, retorna um erro
          if (!tarefa) {
            return res
              .status(404)
              .send({ ok: false, message: "NÃO FOI POSSÍVEL ENCONTRAR A SUA TAREFA, TENTE NOVAMENTE" });
          }

          // Atualiza a tarefa no banco
          const result = await repository.tarefas.update({
            where: { id },
            data: { titulo, descricao },
          });

          // Retorna a resposta
          return res.status(200).send({
            ok: true,
            message: "A TAREFA FOI ATUALIZADA COM SUCESSO!",
            data: result,
          });
        } catch (error: any) {
          // Caso ocorra um erro, envia a mensagem de erro
          return res.status(500).send(error.toString());
        }
      }

      /**
       * Exclui uma tarefa existente
       *
       * @param req 
       * @param res 
       */
      public async ExcluirTarefa(req: Request, res: Response) {
        // Recupera os dados da requisição
        const { id } = req.params;

        // Tenta encontrar a tarefa no banco
        const result = await repository.tarefas.delete({ where: { id } });

        // Retorna a resposta
        return res.status(201).send({
          ok: true,
          message: "A(S) TAREFA(S) EXCLUÍDA(S) COM SUCESSO!",
        });
      }

    }
