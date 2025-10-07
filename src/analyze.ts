import fetch from "node-fetch";
import { inferSchema } from "./utils/schemaInfer.js";
import { checkSecurity } from "./utils/securityCheck.js";

export async function analyze(url: string) {
  const start = performance.now();
  const res = await fetch(url);
  const end = performance.now();

  const time = `${Math.round(end - start)}ms`;
  const size = res.headers.get("content-length") || "unknown";
  const contentType = res.headers.get("content-type") || "unknown";

  let jsonBody = null;
  try {
    if (contentType.includes("application/json")) {
      jsonBody = await res.json();
    }
  } catch {
    jsonBody = null;
  }

  const security = checkSecurity(res.headers, url);

  let structure = null;
  if (jsonBody) structure = inferSchema(jsonBody);

  return {
    method: "GET",
    status: res.status,
    time,
    size,
    contentType,
    headers: Object.fromEntries(res.headers.entries()),
    jsonBody,
    security,
    structure,
  };
}