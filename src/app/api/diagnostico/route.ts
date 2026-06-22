export async function POST() {
  return Response.json(
    { error: "O questionário foi descontinuado." },
    { status: 410 }
  );
}
