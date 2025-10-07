// lib/db.ts
import { Pool } from "pg";

let pool: Pool;

// Garante que a conexão seja criada apenas uma vez (singleton pattern)
if (!global._pgPool) {
  global._pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Configuração para ambientes de produção com SSL (ex: Vercel, Heroku)
    // Em desenvolvimento local, pode não ser necessário.
    ssl:
      process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
  });
}

pool = global._pgPool;

export default pool;

// Adição para evitar erros de tipo com o objeto global no TypeScript
declare global {
  var _pgPool: Pool;
}
