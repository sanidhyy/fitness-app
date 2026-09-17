export const jsonResponse = (statusCode: number, body: unknown) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const getRapidApiKey = () => process.env.RAPID_API_KEY ?? "";
