import { randomUUID } from "crypto";

export class Tarefa {
  public id: string;
  constructor(public titulo: string, public descricao?: string) {
    this.id = randomUUID();
  }
}