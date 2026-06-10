/* ── App state ──────────────────────────────────────────────────────────── */
const state = {
  role: 'public',
  animal: null,
  subtype: null,
  condition: null,
  history: []   // screen id history for back navigation
};

/* ── Progress map — screens mapped to 0–100% ───────────────────────────── */
const PROGRESS = {
  welcome: 0, scene: 12, unsafeScene: 18, roadHazard: 18,
  animalType: 32, batWarning: 48, reptileWarning: 44,
  snakeGuide: 52, introduced: 44, introducedInjured: 60,
  introducedNuisance: 60, domestic: 60,
  animalDanger: 50, aggressiveAnimal: 55,
  condition: 65, critical: 78, injured: 78, orphan: 78,
  distressed: 78, deceased: 78, contacts: 90
};

/* ── Icon color mapping ─────────────────────────────────────────────────── */
const ICON_CLASS = {
  green: 'icon-green', amber: 'icon-amber', red: 'icon-red',
  blue: 'icon-blue', teal: 'icon-teal', gray: 'icon-gray'
};

/* ── Render helpers ─────────────────────────────────────────────────────── */

function alertHTML(a) {
  if (!a) return '';
  return `
    <div class="alert alert-${a.type}" role="alert">
      <i class="ti ${alertIcon(a.type)} alert-icon" aria-hidden="true"></i>
      <div>
        ${a.heading ? `<h3>${a.heading}</h3>` : ''}
        <p>${a.body}</p>
      </div>
    </div>`;
}

function alertIcon(type) {
  return { danger: 'ti-alert-circle', warning: 'ti-alert-triangle', info: 'ti-info-circle', success: 'ti-circle-check' }[type] || 'ti-info-circle';
}

function stepsHTML(steps) {
  if (!steps || !steps.length) return '';
  const items = steps.map((s, i) => {
    // Strip [PROFESSIONAL] steps for public users
    if (s.startsWith('[PROFESSIONAL]') && state.role === 'public') return '';
    const text = s.replace('[PROFESSIONAL] ', '');
    return `<li><div class="step-num">${i + 1}</div><div class="step-text">${text}</div></li>`;
  }).join('');
  return `<ul class="step-list" aria-label="Steps">${items}</ul>`;
}

function choicesHTML(choices) {
  return choices.map(c => `
    <button class="btn-choice" onclick="choose('${c.next}', '${c.value || ''}', this)">
      <div class="btn-icon ${ICON_CLASS[c.color] || 'icon-gray'}">
        <i class="ti ${c.icon}" aria-hidden="true"></i>
      </div>
      <div class="btn-meta">
        <span>${c.label}</span>
        ${c.sub ? `<span class="btn-sub">${c.sub}</span>` : ''}
      </div>
    </button>`).join('');
}

function phaseBadge(node) {
  if (!node.phase) return '';
  return `<div class="phase-badge phase-${node.phaseClass || 'ok'}">
    <i class="ti ti-shield" aria-hidden="true"></i> ${node.phase}
  </div>`;
}

/* ── Screen renderer ────────────────────────────────────────────────────── */

function renderScreen(id) {
  const node = TREE[id];
  if (!node) { console.error('Unknown screen:', id); return; }

  const progress = PROGRESS[id] || 0;
  const showBack = id !== 'welcome';
  const showProgress = id !== 'welcome';

  let html = '';

  // Progress bar
  if (showProgress) {
    html += `<div class="progress-track" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-fill" style="width:${progress}%"></div>
    </div>`;
  }

  // Back button
  if (showBack) {
    html += `<div class="nav-row">
      <button class="btn-back" onclick="goBack()" aria-label="Go back">
        <i class="ti ti-arrow-left" aria-hidden="true"></i> Back
      </button>
    </div>`;
  }

  // Phase badge
  html += phaseBadge(node);

  // Welcome screen special layout
  if (id === 'welcome') {
    html += `
      <div class="welcome-icon" aria-hidden="true"><i class="ti ti-first-aid-kit"></i></div>
      <h1>${node.title}</h1>
      <p class="subtitle">${node.subtitle}</p>
      ${alertHTML(node.warning)}
      <div class="section-label">${node.question}</div>
      <div class="btn-grid">${choicesHTML(node.choices)}</div>`;

  // Contacts screen — special renderer
  } else if (id === 'contacts') {
    html += renderContacts(node);

  // Standard screen
  } else {
    html += `<h2>${node.title}</h2>`;
    if (node.subtitle) html += `<p class="subtitle">${node.subtitle}</p>`;
    if (node.alert) html += alertHTML(node.alert);
    if (node.info) html += alertHTML(node.info);
    if (node.warning) html += alertHTML(node.warning);
    if (node.steps) html += stepsHTML(node.steps);
    if (node.choices) {
      if (node.question) html += `<div class="section-label" style="margin-top:1rem">${node.question}</div>`;
      html += `<div class="btn-grid">${choicesHTML(node.choices)}</div>`;
    }
  }

  // Disclaimer on contacts screen
  if (id === 'contacts') {
    html += `
      <div class="disclaimer">
        This tool provides general first-response guidance only. It does not replace veterinary advice or professional wildlife training. Contact information is provided in good faith and may change — verify before relying on it in an emergency.
      </div>
      <button class="btn-restart" onclick="restart()">
        <i class="ti ti-refresh" aria-hidden="true"></i> Start over
      </button>`;
  }

  document.getElementById('screen-content').innerHTML = html;

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Auto-focus postcode input if on contacts screen
  if (id === 'contacts') {
    setTimeout(() => {
      const inp = document.getElementById('postcode-input');
      if (inp) inp.focus();
    }, 100);
  }
}

/* ── Contacts screen renderer ───────────────────────────────────────────── */

function renderContacts(node) {
  let html = `<h2>${node.title}</h2>
    <p class="subtitle">Enter your postcode to show rescue contacts in your area.</p>
    <div class="postcode-row">
      <input type="text" id="postcode-input" placeholder="e.g. 4350" maxlength="4"
        inputmode="numeric" pattern="[0-9]{4}" autocomplete="postal-code"
        aria-label="Australian postcode" onkeydown="if(event.key==='Enter') lookupContacts()" />
      <button onclick="lookupContacts()">Search</button>
    </div>
    <div id="contact-results"></div>
    <div class="divider"></div>
    <div class="section-label">National contacts — always available</div>`;

  NATIONAL_CONTACTS.forEach(c => {
    html += contactCardHTML(c);
  });

  return html;
}

function contactCardHTML(c) {
  const urgentClass = c.urgent ? ' urgent' : '';
  let actions = '';
  if (c.phone) actions += `<a href="tel:${c.phone.replace(/\s/g,'')}" aria-label="Call ${c.name}"><i class="ti ti-phone" aria-hidden="true"></i> ${c.phone}</a>`;
  if (c.url)   actions += `<a href="${c.url}" target="_blank" rel="noopener noreferrer" aria-label="${c.name} website"><i class="ti ti-external-link" aria-hidden="true"></i> Website</a>`;
  return `
    <div class="contact-card${urgentClass}">
      <div class="contact-name">${c.name}</div>
      <div class="contact-desc">${c.desc}</div>
      ${actions ? `<div class="contact-actions">${actions}</div>` : ''}
    </div>`;
}

function lookupContacts() {
  const pc = (document.getElementById('postcode-input').value || '').trim();
  const el = document.getElementById('contact-results');

  if (!/^\d{4}$/.test(pc)) {
    el.innerHTML = `<div class="alert alert-warning" role="alert">
      <i class="ti ti-alert-triangle alert-icon" aria-hidden="true"></i>
      <p>Please enter a valid 4-digit Australian postcode.</p>
    </div>`;
    return;
  }

  const stateCode = postcodeToState(pc);
  if (!stateCode) {
    el.innerHTML = `<div class="alert alert-warning" role="alert">
      <i class="ti ti-alert-triangle alert-icon" aria-hidden="true"></i>
      <p>Postcode not recognised. Use the national contacts below or try the WIRES rescuer finder tool.</p>
    </div>`;
    return;
  }

  const contacts = STATE_CONTACTS[stateCode] || [];
  let html = `<div class="section-label">Rescue contacts — postcode ${pc} (${stateCode})</div>`;
  contacts.forEach(c => { html += contactCardHTML(c); });
  html += `<div class="divider"></div>`;
  el.innerHTML = html;
}

/* ── Navigation ─────────────────────────────────────────────────────────── */

function choose(nextId, value, btn) {
  // Set state values based on which screen we're on
  const current = state.history[state.history.length - 1] || 'welcome';
  if (current === 'welcome') state.role = value || state.role;
  if (current === 'animalType') state.animal = value || state.animal;
  if (current === 'reptileWarning') state.subtype = value || state.subtype;
  if (current === 'introduced') state.subtype = value || state.subtype;
  if (current === 'condition') state.condition = value || state.condition;

  goto(nextId);
}

function goto(id) {
  const current = state.history[state.history.length - 1];
  if (current !== id) state.history.push(id);
  renderScreen(id);
}

function goBack() {
  if (state.history.length <= 1) return;
  state.history.pop(); // remove current
  const prev = state.history[state.history.length - 1] || 'welcome';
  renderScreen(prev);
}

function restart() {
  state.role = 'public';
  state.animal = null;
  state.subtype = null;
  state.condition = null;
  state.history = [];
  goto('welcome');
}

/* ── Keyboard: back button on Escape ────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') goBack();
});

/* ── Boot ───────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  goto('welcome');
});
