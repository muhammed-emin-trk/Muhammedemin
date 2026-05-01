import { query } from "@/lib/db";

type SyncResult = {
  synced: boolean;
  warning?: string;
};

const ENV_CANDIDATES = {
  token: ["GITHUB_TOKEN"],
  repo: ["GITHUB_REPO"],
  contentPath: ["GITHUB_CONTENT_PATH", "GITHUB_PATH", "CONTENT_PATH"],
  branch: ["GITHUB_BRANCH"],
} as const;

function readEnv(keys: readonly string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }
  return undefined;
}

function normalizeContentPath(path: string): string {
  return path.replace(/^\/+/, "");
}

export async function syncContentToGitHub(trigger: string): Promise<SyncResult> {
  const token = readEnv(ENV_CANDIDATES.token);
  const repo = readEnv(ENV_CANDIDATES.repo);
  const contentPath = readEnv(ENV_CANDIDATES.contentPath);

  const missing = [
    !token ? "GITHUB_TOKEN" : null,
    !repo ? "GITHUB_REPO" : null,
    !contentPath ? "GITHUB_CONTENT_PATH" : null,
  ].filter(Boolean);

  if (missing.length) {
    return {
      synced: false,
      warning:
        `GitHub yedekleme kapalı. Eksik değişken(ler): ${missing.join(", ")}.`,
    };
  }

  const data = {
    projects: await query("SELECT * FROM projects ORDER BY sort_order ASC, id ASC"),
    posts: await query("SELECT * FROM posts ORDER BY sort_order ASC, id ASC"),
    pages: await query("SELECT * FROM pages ORDER BY sort_order ASC, id ASC"),
    testimonials: await query("SELECT * FROM testimonials ORDER BY sort_order ASC, id ASC"),
    faqs: await query("SELECT * FROM faqs ORDER BY sort_order ASC, id ASC"),
    photos: await query("SELECT * FROM personal_photos ORDER BY sort_order ASC, id ASC"),
    settings: (await query("SELECT * FROM site_settings WHERE id=1"))[0] || {},
    exported_at: new Date().toISOString(),
    trigger,
  };

  const path = normalizeContentPath(contentPath as string);
  const branch = readEnv(ENV_CANDIDATES.branch) || "main";
  const apiUrl = `https://api.github.com/repos/${repo}/contents/${path}`;

  const current = await fetch(`${apiUrl}?ref=${encodeURIComponent(branch)}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
    cache: "no-store",
  });

  let sha: string | undefined;
  if (current.ok) {
    const body = await current.json();
    sha = body?.sha;
  }

  const content = Buffer.from(JSON.stringify(data, null, 2), "utf8").toString("base64");

  const push = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `content sync: ${trigger}`,
      content,
      branch,
      sha,
    }),
  });

  if (!push.ok) {
    const err = await push.text();
    return { synced: false, warning: `GitHub senkronu başarısız: ${err.slice(0, 180)}` };
  }

  return { synced: true };
}
