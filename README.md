# 🕵️ Detect-API

[![npm version](https://img.shields.io/badge/npm-v1.0.0-blue.svg)](https://www.npmjs.com/package/api-detect-package)
[![License](https://img.shields.io/badge/license-ISC-green.svg)](https://www.npmjs.com/package/api-detect-package)
[![Node.js Version](https://img.shields.io/badge/node->=18-brightgreen.svg)](https://www.npmjs.com/package/api-detect-package)
[![Downloads](https://img.shields.io/badge/downloads-100%2B-lightgrey.svg)](https://www.npmjs.com/package/api-detect-package)

`detect-api` is a lightweight Node.js CLI tool for analyzing any API endpoint. It helps developers quickly inspect APIs by reporting status, response time, content type, JSON schema, and basic security headers—all from the terminal.

---

## **Features**

- Measure **API response time**  
- Detect **HTTP status & content type**  
- Infer **JSON schema** of the response  
- Check **HTTPS, CORS, and security headers**  
- Colorful terminal output using `chalk`  
- Save reports to JSON with `--save <file>`  
- Fully ESM-ready and TypeScript-supported  

---

## **Installation**

Install globally via npm:

```bash
npm install -g detect-api
```

## **Bash Usage**

You can use `detect-api` directly from your terminal in Bash.

### **Basic Usage**

```bash
detect-api <API_URL>

Analysis complete!

URL: https://jsonplaceholder.typicode.com/posts
Status: 200
Time: 107ms
Size: unknown
Content-Type: application/json; charset=utf-8
Security: {
  "https": true,
  "cors": false,
  "securityHeaders": ["x-content-type-options", "x-powered-by"],
  "risk": "Medium"
}
Schema: {
  "type": "array",
  "keys": {
    "userId": "number",
    "id": "number",
    "title": "string",
    "body": "string"
  }
}
