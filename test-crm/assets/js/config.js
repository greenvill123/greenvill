/**
 * Greenvill CRM — Configuration
 *
 * MODE:
 *  "mock"       -> uses localStorage as the database (works instantly, offline, in-browser)
 *  "apps-script"-> calls your deployed Google Apps Script Web App as the backend
 *
 * To go live with the real PRD stack (Google Sheets + Drive + Apps Script):
 *   1. Deploy api/Code.gs (see /crm/backend/README.md) as a Web App.
 *   2. Paste the /exec URL below.
 *   3. Flip MODE to "apps-script".
 * Nothing else in the app needs to change — api.js talks to both the same way.
 */
window.GREENVILL_CONFIG = Object.assign({
  MODE: "apps-script",
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbzrO4Hr02vJXXDsi6pQYD8SdEwGfqMXHMEU0t5-jbAUT7cGuptr5DyUL0Cm6Q1hdpc2/exec",
  APP_NAME: "Greenvill CRM",
  COMPANY: "Greenvill Associates",
  CURRENCY: "INR",
}, window.GREENVILL_CONFIG || {});
