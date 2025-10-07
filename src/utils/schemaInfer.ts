export function inferSchema(data: any): any {
  if (Array.isArray(data)) {
    return {
      type: "array",
      keys: inferSchema(data[0] || {}),
    };
  }

  if (typeof data === "object" && data !== null) {
    const schema: Record<string, string> = {};
    for (const [key, value] of Object.entries(data)) {
      schema[key] = Array.isArray(value)
        ? "array"
        : typeof value;
    }
    return schema;
  }

  return typeof data;
}