import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { cookies } from "next/headers";
import { ensureTables } from "@/lib/migrate";

async function isAuth() {
  const c = cookies().get("met_admin");
  return !!c?.value;
}

export async function GET(req: NextRequest) {
  if (!(await isAuth())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await ensureTables();

  const { searchParams } = new URL(req.url);
  const range = searchParams.get("range") || "30";
  const days = Math.min(365, Math.max(1, parseInt(range) || 30));

  const [totalViews, uniquePaths, topPages, dailyViews, topReferrers, messages, projects, posts] =
    await Promise.all([
      query(`SELECT COUNT(*) AS count FROM page_views WHERE created_at > NOW() - INTERVAL '${days} days'`),
      query(`SELECT COUNT(DISTINCT path) AS count FROM page_views WHERE created_at > NOW() - INTERVAL '${days} days'`),
      query(`
        SELECT path, COUNT(*) AS views
        FROM page_views
        WHERE created_at > NOW() - INTERVAL '${days} days'
        GROUP BY path
        ORDER BY views DESC
        LIMIT 10
      `),
      query(`
        SELECT DATE(created_at) AS day, COUNT(*) AS views
        FROM page_views
        WHERE created_at > NOW() - INTERVAL '${days} days'
        GROUP BY day
        ORDER BY day ASC
      `),
      query(`
        SELECT referrer, COUNT(*) AS count
        FROM page_views
        WHERE referrer != '' AND created_at > NOW() - INTERVAL '${days} days'
        GROUP BY referrer
        ORDER BY count DESC
        LIMIT 8
      `),
      query(`SELECT COUNT(*) AS count FROM messages`),
      query(`SELECT COUNT(*) AS count FROM projects`),
      query(`SELECT COUNT(*) AS count FROM posts WHERE published = true`),
    ]);

  return NextResponse.json({
    totalViews: Number(totalViews.rows[0]?.count ?? 0),
    uniquePaths: Number(uniquePaths.rows[0]?.count ?? 0),
    topPages: topPages.rows,
    dailyViews: dailyViews.rows,
    topReferrers: topReferrers.rows,
    messages: Number(messages.rows[0]?.count ?? 0),
    projects: Number(projects.rows[0]?.count ?? 0),
    posts: Number(posts.rows[0]?.count ?? 0),
  });
}
