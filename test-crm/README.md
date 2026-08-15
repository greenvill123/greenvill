# Greenvill CRM v1.0

A browser-based CRM for **Greenvill Associates** (loan facilitation) — built from the PRD: Customers, Loans, Banks, Follow-ups, Documents, Reports, Settings, role-based access, and a dashboard with charts.

Vanilla HTML5 + CSS3 + JavaScript, Chart.js for charts, Lucide for icons. No build step — open and run.

## Theme
Deep forest green → white, mild gradient throughout (sidebar gradient, card gradients, hero gradient on the login screen), Sora for headings, Inter for body text, IBM Plex Mono for IDs and figures.

## Run it
Open `index.html` directly in a browser, or serve the folder (recommended, avoids any file:// quirks):

```bash
cd crm
python3 -m http.server 8000
# then visit http://localhost:8000
```

**Demo accounts:**
| Role | Username | Password |
|---|---|---|
| Admin | `admin` | `admin123` |
| Manager | `manager` | `manager123` |
| Agent | `agent` | `agent123` |

Roles gate what's visible: agents can't delete records or open Settings; managers can approve/report but not touch Settings; admin has full access — exactly as scoped in the PRD.

## How data works right now
`assets/js/config.js` has `MODE: "mock"` — the app runs entirely on your browser's `localStorage`, seeded with sample customers/loans/banks so every screen has real data to look at immediately. This means it works instantly, offline, with zero setup, but data is per-browser and not shared between teammates.

## Going to the real PRD stack (Google Sheets + Drive + Apps Script)
1. Create a Google Sheet with tabs: `Users, Customers, Loans, Banks, FollowUps, Documents, ActivityLog, Settings` — column names matching what's in `assets/js/store.js`'s seed data.
2. Open `backend/Code.gs` in that Sheet's Apps Script editor, paste it in, set `SHEET_ID`.
3. Deploy as a Web App (Execute as: Me, Access: Anyone), copy the `/exec` URL.
4. In `assets/js/config.js`, set `MODE: "apps-script"` and paste the URL into `APPS_SCRIPT_URL`.

Nothing else changes — `api.js` calls both backends through the exact same functions, so every page keeps working. Document uploads would then be wired to the Drive API inside `Code.gs`'s `/upload` handler (store the file, save only the Drive URL in the sheet — as the PRD specifies).

## Folder structure
```
crm/
  index.html            Login
  assets/css/           main.css (design tokens + layout), login.css
  assets/js/            config, utils, store (mock DB), api, auth, app (shell), + one file per module
  pages/                dashboard, customers, loans, banks, followups, documents, reports, settings
  backend/Code.gs        Optional real Apps Script backend
```

## What's mocked vs. real
- **Real, working:** all CRUD (customers/loans/banks/follow-ups), search/filter, dashboard charts computed from live data, CSV export, role-based access, CSV/print-to-PDF reports, settings (loan types, company info).
- **Simplified for the demo:** document "upload" stores the file name and type only (no actual file bytes, since production storage is Google Drive, not the browser) — swap in Drive API on the backend to make it real.
- **Not implemented:** actual JWT/SHA-256 hashing (mock login checks plaintext for demo speed), "Forgot Password" flow, WhatsApp/SMS/OCR items listed as PRD Phase 4 future enhancements.
