export async function fetchInfo(url: string) {
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

  return {
    method: "GET",
    status: res.status,
    time,
    size,
    contentType,
    headers: Object.fromEntries(res.headers.entries()),
    jsonBody,
  };
}