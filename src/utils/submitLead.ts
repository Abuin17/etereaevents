// utils/submitLead.ts
export async function submitLead(payload: any) {
  const res = await fetch('/api/airtable-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // ¡NO FormData, NO 'no-cors'!
    body: JSON.stringify(payload),
    // credenciales no necesarias si es mismo dominio
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    // Propaga detalle para depurar
    throw new Error(json?.error || 'Error enviando el formulario');
  }
  return json;
}
