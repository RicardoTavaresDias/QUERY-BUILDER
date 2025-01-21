// Renoado o knex para KnexConfig para evitar conflito de nome
import { knex as KnexConfig } from "knex";
import config from "../../knexfile"

// Carregando todas as configurações de conexão do banco no arquivo knexfile
export const knex = KnexConfig(config)