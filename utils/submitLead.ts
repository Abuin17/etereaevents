// utils/submitLead.ts
export async function submitLead(payload: any) {
  // Usar la nueva API de Neon en lugar de Airtable
  const res = await fetch('/api/wedding-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.error || 'Error enviando el formulario');
  }
  return json;
}
