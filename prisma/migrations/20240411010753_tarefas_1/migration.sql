-- CreateTable
CREATE TABLE "TAREFAS" (
    "id" UUID NOT NULL,
    "titulo" VARCHAR(30) NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "TAREFAS_pkey" PRIMARY KEY ("id")
);
