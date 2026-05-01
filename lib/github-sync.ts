import { query } from "@/lib/db";

type SyncResult = {
  synced: boolean;
  warning?: string;
};

const REQUIRED_ENV = ["GITHUB_TOKEN", "GITHUB_REPO", "GITHUB_CONTENT_PATH"] as const;

export async function syncContentToGitHub(trigger: string): Promise<SyncResult> {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length) {
    return {
      synced: false,
      warning:
        "GitHub yedekleme kapalı. Ayarlamak için GITHUB_TOKEN, GITHUB_REPO ve GITHUB_CONTENT_PATH ortam değişkenlerini ekleyin.",
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

  const repo = process.env.GITHUB_REPO as string;
  const path = process.env.GITHUB_CONTENT_PATH as string;
  const branch = process.env.GITHUB_BRANCH || "main";
  const token = process.env.GITHUB_TOKEN as string;
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
