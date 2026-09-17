import type { Handler } from "@netlify/functions";

import { getRapidApiKey, jsonResponse } from "../lib/http.ts";

const EXERCISE_DB_HOST = "exercisedb.p.rapidapi.com";
const ALLOWED_PATH =
  /^\/exercises(?:\/(?:bodyPartList|exercise\/[^/]+|bodyPart\/[^/]+|target\/[^/]+|equipment\/[^/]+))?$/;

const encodePath = (path: string) =>
  path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return jsonResponse(405, { error: "Method Not Allowed" });
  }

  const apiKey = getRapidApiKey();
  if (!apiKey) {
    return jsonResponse(500, { error: "Missing API key" });
  }

  const rawPath = event.queryStringParameters?.path ?? "/exercises";
  let path: string;

  try {
    path = decodeURIComponent(rawPath);
  } catch {
    return jsonResponse(400, { error: "Invalid path" });
  }

  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  if (path.includes("..") || !ALLOWED_PATH.test(path)) {
    return jsonResponse(400, { error: "Invalid path" });
  }

  const url = new URL(`https://${EXERCISE_DB_HOST}${encodePath(path)}`);
  const limit = event.queryStringParameters?.limit;

  if (limit !== undefined) {
    url.searchParams.set("limit", limit);
  }

  try {
    const response = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": EXERCISE_DB_HOST,
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
