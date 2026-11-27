import { NextResponse, type NextRequest } from 'next/server';
import { capabilities } from '@/lib/env';
import { getSession } from '@/lib/auth/session';
import { applicationStore } from '@/lib/applications/store';
import { programBySlug } from '@/lib/catalog';

/* "Apply now" entry point. A route handler (not a page) because starting a draft
   writes storage: capability → program open → signed in → resume or create. */
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }){
  const { slug } = await params, p = programBySlug(slug);
  const to = (path: string) => NextResponse.redirect(new URL(path, req.url), 303);
  if (!p) return to('/programs');
  if (p.status !== 'open') return to(`/enquire?program=${slug}&kind=interest`);
  if (!capabilities().applications) return to(`/apply/${slug}/closed`);
  const user = await getSession(); if (!user) return to(`/account?next=/apply/${slug}`);
  const store = applicationStore();
  const existing = (await store.list(user)).find(a => a.program === slug);
  if (existing) return to(existing.status === 'draft' ? `/apply/${slug}/${existing.step}` : `/applications/${existing.id}`);
  try { const app = await store.create(user, slug); return to(`/apply/${slug}/${app.step}`); }
  catch { return to('/applications?full=1'); }
}
