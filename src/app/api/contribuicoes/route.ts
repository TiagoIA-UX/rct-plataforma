/** API legada — envio público de textos desativado; doações via PIX em /contribuir */

export async function GET() {
  return Response.json([]);
}

export async function POST() {
  return Response.json({ error: "Use a página Contribuir para doação via PIX." }, { status: 403 });
}

export async function PATCH() {
  return Response.json({ error: "Indisponível." }, { status: 403 });
}
