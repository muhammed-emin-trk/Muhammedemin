type PgPool = {
  query: (text: string, params?: unknown[]) => Promise<{ rows: unknown[] }>;
};

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: PgPool | undefined;
}

function createPool(): PgPool {
  try {
    const req = eval("require") as NodeJS.Require;
    const { Pool } = req("pg") as { Pool: new (config: Record<string, unknown>) => PgPool };

    return new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
      idleTimeoutMillis: 30_000,
    });
  } catch {
    return {
      async query(text: string) {
        const isReadQuery = /^\s*select\b/i.test(text);
        if (isReadQuery) return { rows: [] };

        throw new Error("PostgreSQL sürücüsü yüklenemedi. `pg` bağımlılığı ve Node.js runtime ayarlarını kontrol edin.");
      },
    };
  }
}

function getPool(): PgPool {
  if (!global.__pgPool) global.__pgPool = createPool();
  return global.__pgPool;
}

export async function query<T = unknown>(text: string, params: unknown[] = []): Promise<T[]> {
  try {
    const res = await getPool().query(text, params);
    return res.rows as T[];
  } catch (error) {
    const code = typeof error === "object" && error && "code" in error ? String((error as { code?: string }).code) : "";

    if (
      code === "ECONNREFUSED" ||
      code === "ENOTFOUND" ||
      code === "ETIMEDOUT" ||
      code === "42P01"
    ) {
      const isReadQuery = /^\s*select\b/i.test(text);
      if (isReadQuery) {
        console.warn(`Database read skipped (${code || "unknown"}); returning empty result set.`);
        return [];
      }

      throw new Error(`Database is unavailable (${code || "unknown"}). Check DATABASE_URL and database connectivity.`);
    }

    throw error;
  }
}

export async function queryOne<T = unknown>(text: string, params: unknown[] = []): Promise<T | null> {
  const rows = await query<T>(text, params);
  return rows[0] ?? null;
}
