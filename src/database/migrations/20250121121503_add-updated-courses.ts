import type { Knex } from "knex";

// Cria a tabela com valores
export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("courses", (table) => {
    table.timestamp("updated_at").defaultTo(knex.fn.now()).after("created_at")
  })
}

// Desfaz a createTable realizado a cima
export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("courses", (table) => {
    table.dropColumn("updated_at")
  })
}

