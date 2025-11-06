# Frontend README 

Overview  
This folder contains the static frontend for the contacts app. It consists of three main files: index.html, css/style.css, and js/app.js. The frontend communicates with the backend via the REST API at /api/contacts.

Files
- index.html  
  - Main page with title, an add-contact form (`#add-form`) containing `name` and `phone` inputs, and the contacts container `#contact-list`.  
  - Includes `css/style.css` and `js/app.js`.

- css/style.css  
  - Defines global variables, layout, form and table styles, and responsive rules. Focus and contrast considerations are included.

- js/app.js  
  - Initializes on `DOMContentLoaded`.  
  - Injects an error message element (`#form-error`) below the form.  
  - `fetchContacts()` — GET /api/contacts; returns contacts or handles errors.  
  - `renderTable(contacts)` — builds the contacts table and inserts it into `#contact-list`. User content is escaped via `escapeHtml` before insertion.  
  - `attachDeleteHandlers()` — binds click handlers to `.btn.delete` to confirm and call DELETE /api/contacts/:id (id encoded).  
  - Form submit handler — validates inputs (name required, phone validated), POSTs to /api/contacts, resets form and refreshes list.  
  - `validatePhone()` — simple numeric-length check.  
  - No explicit loading/disable UI; delete handlers are bound per item on each render (not delegated).

How to run (recommended)
- Run with the existing backend static server:
  1. Install dependencies at project root: `npm install`  
  2. Start backend: `node .\server\server.js`  
  3. Open: `http://localhost:3000` (frontend will call `/api/contacts`)

- Static-only testing (no backend): use a static server, but API calls will fail without the backend:
  - Python: `python -m http.server 3000` (run in public or public/src)  
  - or: `npx http-server -p 3000`

User interactions
- Add contact: submit form → client validation → POST /api/contacts → refresh list.  
- Delete contact: click Delete → confirm → DELETE /api/contacts/:id → refresh list.  
- Errors: shown below form for ~5 seconds.

Known limitations 
- Depends on backend `/api/contacts`. Without backend, add/delete will fail.  
- Inputs only use placeholders (no `<label>`), affecting accessibility.  
- Table is rendered via `innerHTML` but uses `escapeHtml` to mitigate XSS.  
- Delete handlers are re-bound on each render (could be improved with event delegation).  
- No loading indicators or request-disable behavior (possible duplicate submissions).

Quick checklist
- [ ] Frontend loads contacts from GET /api/contacts when backend is present.  
- [ ] POST creates a contact and it appears in the table.  
- [ ] DELETE removes the contact and returns 204/success.  
- [ ] All user input is escaped before DOM insertion (escapeHtml is used).  
- [ ] Basic responsive styling works on small screens.