// ─── NOTES & DOCUMENTATION MODULE ───────────────────────────────────────────
// notes.js — handles note-taking, photo capture, location, local storage, PDF export

const Notes = (() => {

  // ── Storage key ────────────────────────────────────────────────────────────
  const STORAGE_KEY = 'wildlife_emergency_notes';

  // ── In-memory record for current session ──────────────────────────────────
  let record = {
    id: null,
    timestamp: null,
    location: { text: '', lat: null, lng: null },
    notes: '',
    photos: [],      // array of base64 data URLs
    treePath: [],    // human-readable steps taken
    hazard: null,
    animalType: null,
    role: null
  };

  let panelOpen = false;

  // ── Init — load any saved draft ────────────────────────────────────────────
  function init() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id) record = parsed;
      }
    } catch(e) {}
    if (!record.id) {
      record.id = 'emer_' + Date.now();
      record.timestamp = new Date().toISOString();
    }
    renderFAB();
  }

  // ── Update record from app state ───────────────────────────────────────────
  function syncAppState(appState) {
    record.role = appState.role;
    record.hazard = appState.hazard;
    record.animalType = appState.animalCategory;
    save();
  }

  // ── Add a step to the path log ─────────────────────────────────────────────
  function logStep(screenId, title) {
    if (!record.treePath) record.treePath = [];
    const last = record.treePath[record.treePath.length - 1];
    if (!last || last.id !== screenId) {
      record.treePath.push({ id: screenId, title: title, time: new Date().toISOString() });
      save();
    }
  }

  // ── Save to localStorage ───────────────────────────────────────────────────
  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch(e) {
      console.warn('Storage save failed (may be full):', e);
    }
  }

  // ── Clear / start new record ───────────────────────────────────────────────
  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    record = {
      id: 'emer_' + Date.now(),
      timestamp: new Date().toISOString(),
      location: { text: '', lat: null, lng: null },
      notes: '',
      photos: [],
      treePath: [],
      hazard: null,
      animalType: null,
      role: null
    };
    save();
  }

  // ── Render the floating action button ─────────────────────────────────────
  function renderFAB() {
    let fab = document.getElementById('notes-fab');
    if (!fab) {
      fab = document.createElement('button');
      fab.id = 'notes-fab';
      fab.className = 'notes-fab';
      fab.setAttribute('aria-label', 'Open notes and documentation');
      fab.setAttribute('title', 'Notes & documentation');
      fab.innerHTML = '<i class="ti ti-notes" aria-hidden="true"></i>';
      fab.addEventListener('click', togglePanel);
      document.body.appendChild(fab);
    }
    // Show badge if notes exist
    const hasContent = record.notes.trim() || record.photos.length || record.location.text;
    fab.classList.toggle('has-content', !!hasContent);
  }

  // ── Toggle notes panel ─────────────────────────────────────────────────────
  function togglePanel() {
    panelOpen = !panelOpen;
    if (panelOpen) openPanel();
    else closePanel();
  }

  function closePanel() {
    panelOpen = false;
    const panel = document.getElementById('notes-panel');
    if (panel) panel.classList.remove('open');
    const overlay = document.getElementById('notes-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  function openPanel() {
    panelOpen = true;
    let overlay = document.getElementById('notes-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'notes-overlay';
      overlay.className = 'notes-overlay';
      overlay.addEventListener('click', closePanel);
      document.body.appendChild(overlay);
    }
    overlay.classList.add('active');

    let panel = document.getElementById('notes-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'notes-panel';
      panel.className = 'notes-panel';
      document.body.appendChild(panel);
    }

    panel.innerHTML = buildPanelHTML();
    panel.classList.add('open');
    bindPanelEvents();
  }

  // ── Build panel HTML ───────────────────────────────────────────────────────
  function buildPanelHTML() {
    const photoHTML = record.photos.map((p, i) => `
      <div class="photo-thumb">
        <img src="${p}" alt="Photo ${i+1}" />
        <button class="photo-remove" onclick="Notes.removePhoto(${i})" aria-label="Remove photo ${i+1}">
          <i class="ti ti-x" aria-hidden="true"></i>
        </button>
      </div>`).join('');

    const ts = record.timestamp ? new Date(record.timestamp).toLocaleString('en-AU') : '';
    const locBtnLabel = record.location.lat ? '✓ Location captured' : 'Get GPS location';

    return `
      <div class="notes-panel-header">
        <div class="notes-panel-title">
          <i class="ti ti-notes" aria-hidden="true"></i>
          Incident notes
        </div>
        <button class="notes-close-btn" onclick="Notes.closePanel()" aria-label="Close notes">
          <i class="ti ti-x" aria-hidden="true"></i>
        </button>
      </div>
      <div class="notes-panel-body">
        <div class="notes-meta">Started: ${ts}</div>

        <div class="notes-section-label">Location</div>
        <div class="notes-location-row">
          <input type="text" id="notes-location-text" class="notes-input"
            placeholder="Property name, road, or description"
            value="${escapeHTML(record.location.text)}"
            oninput="Notes.updateLocation(this.value)" />
          <button class="notes-gps-btn" id="notes-gps-btn" onclick="Notes.getGPS()">
            <i class="ti ti-map-pin" aria-hidden="true"></i>
            ${locBtnLabel}
          </button>
        </div>
        ${record.location.lat ? `<div class="notes-gps-result">GPS: ${record.location.lat.toFixed(5)}, ${record.location.lng.toFixed(5)}
          <a href="https://maps.google.com/?q=${record.location.lat},${record.location.lng}" target="_blank" rel="noopener noreferrer">Open in maps</a>
        </div>` : ''}

        <div class="notes-section-label">Notes</div>
        <textarea id="notes-textarea" class="notes-textarea"
          placeholder="Describe the animal, its condition, what actions you took, who you spoke to..."
          oninput="Notes.updateNotes(this.value)">${escapeHTML(record.notes)}</textarea>

        <div class="notes-section-label">Photos</div>
        <div class="photo-grid" id="photo-grid">
          ${photoHTML}
          <label class="photo-add-btn" aria-label="Add photo">
            <i class="ti ti-camera" aria-hidden="true"></i>
            <span>Add photo</span>
            <input type="file" accept="image/*" capture="environment"
              id="photo-input" style="display:none" onchange="Notes.addPhoto(event)" multiple />
          </label>
        </div>

        <div class="notes-actions">
          <button class="notes-export-btn" onclick="Notes.exportPDF()">
            <i class="ti ti-file-download" aria-hidden="true"></i>
            Download / print summary
          </button>
          <button class="notes-clear-btn" onclick="Notes.confirmClear()">
            <i class="ti ti-trash" aria-hidden="true"></i>
            Clear notes
          </button>
        </div>
      </div>`;
  }

  function bindPanelEvents() {
    // Nothing extra needed — all handlers are inline with Notes.* calls
  }

  // ── Update handlers ────────────────────────────────────────────────────────
  function updateLocation(val) {
    record.location.text = val;
    save();
    renderFAB();
  }

  function updateNotes(val) {
    record.notes = val;
    save();
    renderFAB();
  }

  // ── GPS ────────────────────────────────────────────────────────────────────
  function getGPS() {
    const btn = document.getElementById('notes-gps-btn');
    if (btn) { btn.textContent = 'Locating...'; btn.disabled = true; }

    if (!navigator.geolocation) {
      alert('GPS is not available on this device or browser.');
      if (btn) { btn.textContent = 'Get GPS location'; btn.disabled = false; }
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        record.location.lat = pos.coords.latitude;
        record.location.lng = pos.coords.longitude;
        save();
        openPanel(); // re-render with GPS result
      },
      err => {
        alert('Could not get location: ' + err.message + '\nEnter the location manually above.');
        if (btn) { btn.textContent = 'Get GPS location'; btn.disabled = false; }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }

  // ── Photos ─────────────────────────────────────────────────────────────────
  function addPhoto(event) {
    const files = Array.from(event.target.files || []);
    let pending = files.length;
    if (!pending) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        record.photos.push(e.target.result);
        pending--;
        if (pending === 0) {
          save();
          openPanel(); // re-render
        }
      };
      reader.readAsDataURL(file);
    });
  }

  function removePhoto(index) {
    record.photos.splice(index, 1);
    save();
    openPanel(); // re-render
  }

  // ── Confirm clear ──────────────────────────────────────────────────────────
  function confirmClear() {
    if (confirm('Clear all notes, location, and photos for this incident? This cannot be undone.')) {
      reset();
      openPanel();
      renderFAB();
    }
  }

  // ── PDF Export ─────────────────────────────────────────────────────────────
  function exportPDF() {
    const win = window.open('', '_blank');
    if (!win) {
      alert('Please allow pop-ups for this page to export the PDF.');
      return;
    }

    const ts = record.timestamp ? new Date(record.timestamp).toLocaleString('en-AU') : 'Unknown';
    const now = new Date().toLocaleString('en-AU');

    const hazardLabel   = formatLabel(record.hazard)      || 'Not recorded';
    const animalLabel   = formatLabel(record.animalType)   || 'Not recorded';
    const roleLabel     = formatLabel(record.role)         || 'Not recorded';
    const locationText  = record.location.text             || 'Not recorded';
    const gps           = record.location.lat
      ? `${record.location.lat.toFixed(5)}, ${record.location.lng.toFixed(5)}`
      : 'Not recorded';
    const notesText     = record.notes.trim()              || 'No notes recorded.';

    const pathHTML = record.treePath && record.treePath.length
      ? record.treePath.map((s, i) =>
          `<tr><td class="step-num">${i + 1}</td><td>${escapeHTML(s.title || s.id)}</td><td class="step-time">${new Date(s.time).toLocaleTimeString('en-AU')}</td></tr>`
        ).join('')
      : '<tr><td colspan="3">No path recorded.</td></tr>';

    const photosHTML = record.photos.length
      ? record.photos.map((p, i) =>
          `<div class="photo-item"><img src="${p}" alt="Photo ${i+1}" /><p>Photo ${i+1}</p></div>`
        ).join('')
      : '<p class="no-content">No photos attached.</p>';

    win.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Animal Emergency Incident Report</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #1a1a18; padding: 2cm; }
  h1 { font-size: 20px; font-weight: 700; color: #0F6E56; margin-bottom: 4px; }
  h2 { font-size: 14px; font-weight: 600; color: #0F6E56; margin: 18px 0 8px; border-bottom: 1px solid #cce8df; padding-bottom: 4px; }
  .report-meta { font-size: 12px; color: #666; margin-bottom: 16px; }
  .disclaimer { background: #fff8e6; border: 1px solid #f5c842; padding: 10px 14px; border-radius: 6px; font-size: 12px; margin-bottom: 20px; }
  .info-grid { display: grid; grid-template-columns: 140px 1fr; gap: 6px 12px; margin-bottom: 8px; }
  .info-label { font-weight: 600; color: #444; }
  .info-value { color: #1a1a18; }
  table { width: 100%; border-collapse: collapse; margin-top: 4px; }
  th { background: #E1F5EE; color: #0F6E56; font-size: 12px; text-align: left; padding: 6px 8px; }
  td { padding: 5px 8px; border-bottom: 1px solid #eee; font-size: 12px; vertical-align: top; }
  td.step-num { width: 32px; color: #888; }
  td.step-time { width: 80px; color: #888; white-space: nowrap; }
  .notes-box { background: #f9f9f7; border: 1px solid #e0ded8; border-radius: 6px; padding: 12px 14px; white-space: pre-wrap; line-height: 1.6; min-height: 60px; }
  .photo-grid { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 8px; }
  .photo-item { text-align: center; }
  .photo-item img { max-width: 180px; max-height: 180px; border: 1px solid #ddd; border-radius: 6px; display: block; }
  .photo-item p { font-size: 11px; color: #888; margin-top: 4px; }
  .no-content { color: #888; font-style: italic; }
  .footer { margin-top: 28px; font-size: 11px; color: #999; border-top: 1px solid #eee; padding-top: 10px; }
  @media print {
    body { padding: 1cm; }
    @page { margin: 1.5cm; }
  }
</style>
</head>
<body>
  <h1>Animal Emergency Incident Report</h1>
  <div class="report-meta">Generated: ${now}</div>
  <div class="disclaimer">
    <strong>Disclaimer:</strong> This report is a record of observations and actions taken in the field.
    It does not replace veterinary advice or professional wildlife training.
  </div>

  <h2>Incident summary</h2>
  <div class="info-grid">
    <span class="info-label">Incident started</span><span class="info-value">${ts}</span>
    <span class="info-label">Reported by</span><span class="info-value">${roleLabel}</span>
    <span class="info-label">Emergency type</span><span class="info-value">${hazardLabel}</span>
    <span class="info-label">Animal type</span><span class="info-value">${animalLabel}</span>
  </div>

  <h2>Location</h2>
  <div class="info-grid">
    <span class="info-label">Description</span><span class="info-value">${escapeHTML(locationText)}</span>
    <span class="info-label">GPS coordinates</span><span class="info-value">${gps}</span>
    ${record.location.lat ? `<span class="info-label">Maps link</span><span class="info-value">https://maps.google.com/?q=${record.location.lat},${record.location.lng}</span>` : ''}
  </div>

  <h2>Steps taken</h2>
  <table>
    <thead><tr><th>#</th><th>Step</th><th>Time</th></tr></thead>
    <tbody>${pathHTML}</tbody>
  </table>

  <h2>Field notes</h2>
  <div class="notes-box">${escapeHTML(notesText)}</div>

  <h2>Photos (${record.photos.length})</h2>
  <div class="photo-grid">${photosHTML}</div>

  <div class="footer">
    Animal Emergency Guide · Australia · animalscience-unisq.github.io/animals-in-emergencies ·
    Record ID: ${record.id}
  </div>

  <script>window.onload = function(){ window.print(); }<\/script>
</body>
</html>`);
    win.document.close();
  }

  // ── Helpers ────────────────────────────────────────────────────────────────
  function formatLabel(val) {
    if (!val) return '';
    return val.replace(/([A-Z])/g, ' $1')
              .replace(/^./, s => s.toUpperCase())
              .replace(/_/g, ' ')
              .trim();
  }

  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ── Prompt at contacts screen ──────────────────────────────────────────────
  function renderContactsPrompt() {
    const hasContent = record.notes.trim() || record.photos.length || record.location.text;
    return `
      <div class="notes-prompt-card" role="complementary" aria-label="Documentation prompt">
        <div class="notes-prompt-icon">
          <i class="ti ti-notes" aria-hidden="true"></i>
        </div>
        <div class="notes-prompt-body">
          <div class="notes-prompt-title">Document this incident</div>
          <div class="notes-prompt-sub">
            ${hasContent
              ? 'You have saved notes for this incident.'
              : 'Add location, notes, and photos for your records.'}
          </div>
        </div>
        <div class="notes-prompt-actions">
          <button onclick="Notes.openPanel()" class="notes-prompt-btn-primary">
            <i class="ti ti-notes" aria-hidden="true"></i>
            ${hasContent ? 'View notes' : 'Add notes'}
          </button>
          ${hasContent ? `<button onclick="Notes.exportPDF()" class="notes-prompt-btn-secondary">
            <i class="ti ti-file-download" aria-hidden="true"></i>
            Export PDF
          </button>` : ''}
        </div>
      </div>`;
  }

  // ── Public API ─────────────────────────────────────────────────────────────
  return {
    init,
    syncAppState,
    logStep,
    save,
    reset,
    openPanel,
    closePanel,
    togglePanel,
    getGPS,
    addPhoto,
    removePhoto,
    updateLocation,
    updateNotes,
    exportPDF,
    confirmClear,
    renderContactsPrompt,
    getRecord: () => record
  };

})();

// Make Notes globally accessible for inline event handlers
window.Notes = Notes;
