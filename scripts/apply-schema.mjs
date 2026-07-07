import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import pg from "pg"

const __dirname = dirname(fileURLToPath(import.meta.url))
const fileArg = process.argv[2] || "001_schema.sql"
const sql = readFileSync(join(__dirname, fileArg), "utf8")

let connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL
if (!connectionString) {
  console.error("Missing POSTGRES_URL_NON_POOLING / POSTGRES_URL")
  process.exit(1)
}

// Strip sslmode so pg-connection-string doesn't force verify-full; we set ssl manually below.
connectionString = connectionString.replace(/([?&])sslmode=[^&]*/i, "$1").replace(/[?&]$/, "")

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } })

try {
  await client.connect()
  await client.query(sql)
  console.log("Schema applied successfully.")
} catch (err) {
  console.error("Failed to apply schema:", err.message)
  process.exitCode = 1
} finally {
  await client.end()
}
