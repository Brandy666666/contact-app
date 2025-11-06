# Backend Code Style 

Sources (adopted)
- Airbnb JavaScript Style Guide: https://github.com/airbnb/javascript  
- Node.js Best Practices (RisingStack) and community recommendations  
- ESLint recommended rules: https://eslint.org/docs/latest/rules/

Purpose
This document defines a concise, practical code style for the backend of this project (Express, CommonJS). Rules prioritize readability, maintainability, performance, and alignment with the sources above.

1. General
- Indent: 2 spaces.  
- Quotes: single quotes.  
- Semicolons: required.  
- Max line length: 100 columns.  
- Files must end with a single newline.  
- Naming: camelCase for variables/functions, PascalCase for constructors, UPPER_SNAKE_CASE for true constants.  
- Keep comments concise; use TODO/NOTE tags where appropriate.

2. Requires and top-of-file ordering
- Use const / let (no var).  
- Group requires by: built-in -> third-party -> local, separated by a blank line. Example:
  const fs = require('fs');
  const path = require('path');
  const express = require('express');

3. Asynchronous I/O
- Avoid synchronous fs calls (fs.readFileSync / fs.writeFileSync) in request handlers; they block the event loop. Use fs.promises or async APIs.  
- Synchronous calls only acceptable for startup initialization (ensuring directories, migrations, etc.).  
- Always handle async errors with try/catch or .catch().

4. Error handling and logging
- Log server errors (console.error or logging library). Do not expose stack traces or sensitive info to clients.  
- Use a structured logger (winston, pino) for production when possible.

5. Express conventions
- Register middleware in order: body parser -> static -> routes -> error handler.  
- Keep route handlers thin; extract business logic into separate modules/functions for testability.  
- Use environment variables for configuration: const PORT = process.env.PORT || 3000.  
- Serve static assets via path.join(__dirname, '../public') and ensure no sensitive directories are exposed.

6. API design and responses
- Use proper HTTP status codes: 200, 201, 204, 4xx for client errors, 5xx for server errors.  
- Return JSON via res.json(...).  
- Validate inputs (presence, type, length). Use a validation library (Joi, celebrate) for robust checks.

7. Functions and modularization
- Single responsibility per function. Move file read/write and business logic into separate modules (e.g., lib/data.js).  
- Export only necessary interfaces: module.exports = { getContacts, saveContacts }.

8. Concurrency and data persistence
- If using file-based storage, handle concurrent writes (queueing or file locks) to avoid corruption. Consider moving to a lightweight DB (SQLite, lowdb, MongoDB) for concurrency and reliability.

9. Security and robustness
- Sanitize and validate user input before writing/processing.  
- Add common security middleware for public-facing apps (helmet, express-rate-limit).  
- Limit exposed error details to prevent information disclosure.

10. Testing
- Extract logic so it can be unit-tested without network.  
- Use Jest or Mocha+Chai for tests. Add tests for data read/write and route behaviors.