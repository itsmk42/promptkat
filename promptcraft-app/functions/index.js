const functions = require("firebase-functions");
const { https } = require("firebase-functions");
const next = require("next");
const path = require("path");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
  conf: {
    distDir: ".next",
  },
});
const handle = app.getRequestHandler();

exports.nextjs = https.onRequest(async (req, res) => {
  console.log(`File: ${req.originalUrl}`);
  
  // For static files, serve them directly
  const staticPath = path.join(__dirname, "../public", req.path);
  if (fs.existsSync(staticPath) && !fs.statSync(staticPath).isDirectory()) {
    const contentType = getContentType(req.path);
    res.set("Content-Type", contentType);
    return res.sendFile(staticPath);
  }
  
  // For Next.js pages, use the Next.js handler
  await app.prepare();
  return handle(req, res);
});

// Helper function to determine content type
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
  };
  
  return contentTypes[ext] || "application/octet-stream";
}
