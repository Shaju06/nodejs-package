import type { Headers as FetchHeaders } from "node-fetch";

export function checkSecurity(headers: FetchHeaders, url: string) {
  const https = url.startsWith("https");
  const cors = !!headers.get("access-control-allow-origin");
  const securityHeaders = Array.from(headers.keys()).filter((h) =>
    h.startsWith("x-") || h.toLowerCase().includes("security")
  );

  return {
    https,
    cors,
    securityHeaders,
    risk: https ? (cors ? "Low" : "Medium") : "High",
  };
}