/**
 * KIVI DIGITAL — Contact Form Backend (Google Apps Script)
 * -----------------------------------------------------------
 * This is the simplest possible secure backend: it runs entirely on
 * Google's servers, is free, and needs no hosting or server of your own.
 *
 * SETUP (one time, ~5 minutes):
 *
 * 1. Create a new Google Sheet. Add this header row in row 1:
 *      Timestamp | Name | Email | Phone | Company | Service | Message | Source | Page
 *
 * 2. In that Sheet, open Extensions → Apps Script.
 *
 * 3. Delete any starter code and paste this whole file in.
 *
 * 4. Click "Deploy" → "New deployment" → type: "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Click Deploy, authorize the permissions it asks for.
 *
 * 5. Copy the "Web app URL" you're given. That is your GOOGLE_APPS_SCRIPT_URL.
 *
 * 6. Paste that URL into contact.html, replacing:
 *      window.CONTACT_ENDPOINT = "";
 *    with:
 *      window.CONTACT_ENDPOINT = "https://script.google.com/macros/s/XXXX/exec";
 *
 * That's it — every form submission now appends a row to your Sheet AND
 * emails you a notification. No API keys ever touch the browser.
 */

const NOTIFY_EMAIL = "jyoti30505@gmail.com";

function doGet() {
  return jsonResponse({ ok: true, service: "KIVI DIGITAL contact form" });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Basic server-side validation — never trust the client alone.
    if (!data.name || !data.email || !data.message) {
      return jsonResponse({ ok: false, error: "Missing required fields." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return jsonResponse({ ok: false, error: "Invalid email." });
    }
    // Honeypot: if the hidden field was filled, it's a bot — pretend success.
    if (data.company_website) {
      return jsonResponse({ ok: true });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const timestamp = new Date();

    sheet.appendRow([
      timestamp,
      data.name || "",
      data.email || "",
      data.phone || "",
      data.company || "",
      data.service || "",
      data.message || "",
      data.source || "Website",
      data.page || "",
    ]);

    sendNotificationEmail(data, timestamp);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function sendNotificationEmail(data, timestamp) {
  const subject = "New KIVI DIGITAL Website Enquiry";
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;">
      <h2 style="color:#131313;">New KIVI DIGITAL Website Enquiry</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px 0;font-weight:bold;width:120px;">Name:</td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Email:</td><td>${escapeHtml(data.email)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Phone:</td><td>${escapeHtml(data.phone || "-")}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Company:</td><td>${escapeHtml(data.company || "-")}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Service:</td><td>${escapeHtml(data.service || "-")}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;vertical-align:top;">Message:</td><td>${escapeHtml(data.message)}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Submitted at:</td><td>${timestamp.toString()}</td></tr>
        <tr><td style="padding:6px 0;font-weight:bold;">Page:</td><td>${escapeHtml(data.page || "-")}</td></tr>
      </table>
    </div>
  `;

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: subject,
    htmlBody: html,
  });
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
