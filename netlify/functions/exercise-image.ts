import type { Handler } from "@netlify/functions";

import { getRapidApiKey, jsonResponse } from "../lib/http.ts";

const EXERCISE_DB_HOST = "exercisedb.p.rapidapi.com";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return jsonResponse(405, { error: "Method Not Allowed" });
  }

  const apiKey = getRapidApiKey();
  if (!apiKey) {
    return jsonResponse(500, { error: "Missing API key" });
  }

  const id = event.queryStringParameters?.id;
  if (!id || !/^[A-Za-z0-9_-]+$/.test(id)) {
    return jsonResponse(400, { error: "Invalid id" });
  }

  const resolution = event.queryStringParameters?.resolution ?? "180";
  if (!/^\d+$/.test(resolution)) {
    return jsonResponse(400, { error: "Invalid resolution" });
  }

  const url = new URL(`https://${EXERCISE_DB_HOST}/image`);
  url.searchParams.set("exerciseId", id);
  url.searchParams.set("resolution", resolution);

  try {
    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": EXERCISE_DB_HOST,
      },
    });
    const buffer = await response.arrayBuffer();

    return {
      statusCode: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") ?? "image/gif",
        "Cache-Control": "public, max-age=86400",
      },
      body: Buffer.from(buffer).toString("base64"),
      isBase64Encoded: true,
    };
  } catch {
    return jsonResponse(502, { error: "Upstream request failed" });
  }
};
