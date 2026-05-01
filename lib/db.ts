type PgPool = {
  query: (text: string, params?: unknown[]) => Promise<{ rows: unknown[] }>;
};

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: PgPool | undefined;
  // eslint-disable-next-line no-var
  var __pgPoolPromise: Promise<PgPool> | undefined;
}

async function createPool(): Promise<PgPool> {
  try {
    const { Pool } = (await import("pg")) as { Pool: new (config: Record<string, unknown>) => PgPool };

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

async function getPool(): Promise<PgPool> {
  if (global.__pgPool) return global.__pgPool;
  if (!global.__pgPoolPromise) {
    global.__pgPoolPromise = createPool().then((pool) => {
      global.__pgPool = pool;
      return pool;
    });
  }
  return global.__pgPoolPromise;
}

export async function query<T = unknown>(text: string, params: unknown[] = []): Promise<T[]> {
  try {
    const pool = await getPool();
    const res = await pool.query(text, params);
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
