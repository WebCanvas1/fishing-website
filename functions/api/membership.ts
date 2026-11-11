interface MembershipDatabase {
  prepare(query: string): {
    bind(...values: string[]): { run(): Promise<{ success: boolean }> };
  };
}

export async function onRequestPost({ request, env }: {
  request: Request;
  env: { MEMBERSHIP_DB: MembershipDatabase };
}) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const notes = typeof body?.notes === 'string' ? body.notes.trim() : '';

  if (!name || name.length > 100 || email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || notes.length > 1900) {
    return Response.json({ ok: false }, { status: 400 });
  }

  try {
    const result = await env.MEMBERSHIP_DB
      .prepare('INSERT INTO membership_enquiries (name, email, notes) VALUES (?, ?, ?)')
      .bind(name, email, notes)
      .run();
    return Response.json({ ok: result.success }, { status: result.success ? 201 : 503 });
  } catch {
    return Response.json({ ok: false }, { status: 503 });
  }
}
