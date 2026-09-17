import type { Handler } from "@netlify/functions";

import { getRapidApiKey, jsonResponse } from "../lib/http.ts";

const YOUTUBE_HOST = "youtube-search-and-download.p.rapidapi.com";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return jsonResponse(405, { error: "Method Not Allowed" });
  }

  const apiKey = getRapidApiKey();
  if (!apiKey) {
    return jsonResponse(500, { error: "Missing API key" });
  }

  const query = event.queryStringParameters?.query?.trim();
  if (!query) {
    return jsonResponse(400, { error: "Missing query" });
  }

  const url = new URL(`https://${YOUTUBE_HOST}/search`);
  url.searchParams.set("query", query);

  try {
    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": YOUTUBE_HOST,
      },
    });
    const body = await response.text();

    return {
      statusCode: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ?? "application/json",
      },
      body,
    };
  } catch {
    return jsonResponse(502, { error: "Upstream request failed" });
  }
};
