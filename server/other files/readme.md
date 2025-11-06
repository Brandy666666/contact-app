# Backend (server) README

Overview
- This folder contains a minimal Express backend that provides a simple contacts CRUD API and serves frontend static files from ../public.
- Storage: file-based at server/data/contacts.json. The file and directory are created automatically on first run.

Entrypoint
- server/server.js

Requirements
- Node.js (recommended >= 18)
- npm

Run (Windows PowerShell)
1. Install dependencies (if not installed):
   ```
   npm install
   ```
2. Start the server:
   ```
   node .\server\server.js
   ```
   The server uses port 3000 (hard-coded in the current code). Frontend static files are served from ../public.

API Endpoints
- GET /api/contacts
  - Returns: 200 OK with JSON array of contacts.
  - Example:
    ```
    curl http://localhost:3000/api/contacts
    ```
- POST /api/contacts
  - Request body: JSON, e.g. { "name": "Alice", "phone": "123456" }
  - Returns: 201 Created with the created contact (includes generated id).
  - Example:
    ```
    curl -X POST http://localhost:3000/api/contacts -H "Content-Type: application/json" -d '{"name":"Alice","phone":"123"}'
    ```
- DELETE /api/contacts/:id
  - Deletes contact by id.
  - Returns: 204 No Content.
  - Example:
    ```
    curl -X DELETE http://localhost:3000/api/contacts/167xxxxxxx
    ```

Project structure (relevant)
- server/
  - server.js         — Express app and routes (uses synchronous fs I/O)
  - data/
    - contacts.json   — storage file (auto-created)
  - other files/
    - codestyle.md    — backend code style notes

Behavior notes (as-is)
- server.js uses synchronous file I/O (fs.readFileSync / fs.writeFileSync) for reading and writing contacts on each request. This matches the original code and is preserved here.
- The application logs messages to the console and serves the frontend at http://localhost:3000.

Known limitations
- Synchronous file I/O blocks the event loop and is not suitable for high concurrency or production. Concurrent writes may cause data races or file corruption.
- The port is hard-coded to 3000 in server.js (no environment variable support in current code).
- No structured logging or input validation beyond basic behavior.

Code style
- Backend code style notes are in server/other files/codestyle.md (based on Airbnb, Node.js best practices, ESLint recommendations).

License / Purpose
- This backend is intended for learning/demo purposes and kept unchanged from the original implementation.