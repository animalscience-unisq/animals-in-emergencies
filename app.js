// ─── APP STATE ───────────────────────────────────────────────────────────────
const state = {
  role: 'public',       // public | professional | farmer
  hazard: null,         // bushfire | flood | heatwave | drought | storm | vehicle | entanglement | general
  animalCategory: null, // nativeMammal | bat | bird | reptile | marine | cattle | horse | sheep | pig | poultry | domestic | feral
  animalSubtype: null,
  condition: null,
  history: []
};

// ─── PROGRESS MAP ────────────────────────────────────────────────────────────
const PROGRESS = {
  welcome: 0,
  hazardType: 10,
  sceneBushfire: 18, sceneFlood: 18, sceneHeatwave: 18,
  sceneDrought: 18, sceneStorm: 18, sceneVehicle: 18,
  sceneEntanglement: 18, sceneGeneral: 18,
  animalCategory: 30,
  nativeMammalType: 38,
  koalaGuide: 44, echidnaGuide: 44,
  batWarning: 44, reptileType: 38, snakeGuide: 50,
  turtleGuide: 50, marineGuide: 44, cetaceanGuide: 52, sealGuide: 52,
  animalDanger: 50, aggressiveAnimal: 55,
  condition: 62,
  critical: 78, injured: 78, orphan: 78, distressed: 78, deceased: 78,
  livestockCattle: 44, cattleFire: 65, cattleFlood: 65, cattleHeat: 65,
  cattleDrought: 65, cattleInjury: 65, cattleBirth: 65,
  livestockHorse: 44, horseFire: 65, horseFlood: 65, horseHeat: 65,
  horseColic: 65, horseInjury: 65, horseCast: 65,
  livestockSheep: 44, sheepFire: 65, sheepFlood: 65, sheepHeat: 65,
  sheepCast: 65, sheepBirth: 65,
  livestockPig: 65, livestockPoultry: 65,
  domesticAnimal: 44, domesticInjured: 65, domesticLost: 65, domesticEmergency: 65,
  feralAnimal: 44, introducedInjured: 65, introducedNuisance: 65,
  contacts: 90
};

// ─── ICON COLOUR MAP ─────────────────────────────────────────────────────────
const ICON_CLASS = {
  green: 'icon-green', amber: 'icon-amber', red: 'icon-red',
  blue: 'icon-blue', teal: 'icon-teal', gray: 'icon-gray'
};

// ─── RENDER HELPERS ──────────────────────────────────────────────────────────

function alertIconName(type) {
  return {
    danger: 'ti-alert-circle', warning: 'ti-alert-triangle',
    info: 'ti-info-circle', success: 'ti-circle-check'
  }[type] || 'ti-info-circle';
}

function alertHTML(a) {
  if (!a) return '';
  return `
    <div class="alert alert-${a.type}" role="alert">
      <i class="ti ${alertIconName(a.type)} alert-icon" aria-hidden="true"></i>
      <div>
        ${a.heading ? `<h3>${a.heading}</h3>` : ''}
        <p>${a.body}</p>
      </div>
    </div>`;
}

function stepsHTML(steps) {
  if (!steps || !steps.length) return '';
  let n = 0;
  const items = steps.map(s => {
    const isPro = s.startsWith('[PROFESSIONAL]');
    if (isPro && state.role === 'public') return '';
    const text = s.replace('[PROFESSIONAL] ', '');
    n++;
    return `<li><div class="step-num">${n}</div><div class="step-text">${text}</div></li>`;
  }).join('');
  return `<ul class="step-list" aria-label="Steps">${items}</ul>`;
}

function choicesHTML(choices) {
  return choices.map(c => `
    <button class="btn-choice" onclick="choose('${c.next}', '${c.value || ''}')">
      <div class="btn-icon ${ICON_CLASS[c.color] || 'icon-gray'}">
        <i class="ti ${c.icon || 'ti-arrow-right'}" aria-hidden="true"></i>
      </div>
      <div class="btn-meta">
        <span>${c.label}</span>
        ${c.sub ? `<span class="btn-sub">${c.sub}</span>` : ''}
      </div>
    </button>`).join('');
}

function phaseBadgeHTML(node) {
  if (!node.phase) return '';
  return `<div class="phase-badge phase-${node.phaseClass || 'ok'}" aria-label="Phase: ${node.phase}">
    <i class="ti ti-map-pin" aria-hidden="true"></i> ${node.phase}
  </div>`;
}

// ─── SCREEN RENDERER ─────────────────────────────────────────────────────────

function renderScreen(id) {
  const node = TREE[id];
  if (!node) { console.error('Unknown screen:', id); return; }

  const progress = PROGRESS[id] || 0;
  const showBack  = id !== 'welcome';
  const showProg  = id !== 'welcome';

  let html = '';

  if (showProg) {
    html += `<div class="progress-track" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" aria-label="Progress: ${progress}%">
      <div class="progress-fill" style="width:${progress}%"></div>
    </div>`;
  }

  if (showBack) {
    html += `<div class="nav-row">
      <button class="btn-back" onclick="goBack()" aria-label="Go back">
        <i class="ti ti-arrow-left" aria-hidden="true"></i> Back
      </button>
    </div>`;
  }

  html += phaseBadgeHTML(node);

  // ── Welcome ──
  if (id === 'welcome') {
    html += `
      <div class="welcome-icon" aria-hidden="true"><i class="ti ti-first-aid-kit"></i></div>
      <h1>${node.title}</h1>
      <p class="subtitle">${node.subtitle}</p>
      ${alertHTML(node.warning)}
      <div class="section-label">${node.question}</div>
      <div class="btn-grid">${choicesHTML(node.choices)}</div>`;

  // ── Contacts ──
  } else if (id === 'contacts') {
    html += renderContactsScreen(node);

  // ── Standard ──
  } else {
    html += `<h2>${node.title}</h2>`;
    if (node.subtitle) html += `<p class="subtitle">${node.subtitle}</p>`;
    if (node.alert)    html += alertHTML(node.alert);
    if (node.info)     html += alertHTML(node.info);
    if (node.warning)  html += alertHTML(node.warning);
    if (node.steps)    html += stepsHTML(node.steps);
    if (node.choices) {
      if (node.question) html += `<div class="section-label" style="margin-top:1rem">${node.question}</div>`;
      html += `<div class="btn-grid">${choicesHTML(node.choices)}</div>`;
    }
  }

  if (id === 'contacts') {
    html += `
      <div class="disclaimer">
        This tool provides general first-response guidance only. It does not replace veterinary advice or professional training.
        Contact details are provided in good faith and may change — verify before relying on them in an emergency.
      </div>
      <button class="btn-restart" onclick="restart()">
        <i class="ti ti-refresh" aria-hidden="true"></i> Start over
      </button>`;
  }

  document.getElementById('screen-content').innerHTML = html;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (id === 'contacts') {
    setTimeout(() => {
      const inp = document.getElementById('postcode-input');
      if (inp) inp.focus();
    }, 100);
  }
}

// ─── CONTACTS SCREEN ─────────────────────────────────────────────────────────

function renderContactsScreen(node) {
  // Show hazard-specific callout if relevant
  let hazardNote = '';
  if (state.hazard === 'bushfire') {
    hazardNote = alertHTML({ type: 'danger', heading: 'Bushfire emergency', body: 'For active fire: call 000. For post-fire animal welfare: contact your state agriculture department or wildlife authority.' });
  } else if (state.hazard === 'flood') {
    hazardNote = alertHTML({ type: 'danger', heading: 'Flood emergency', body: 'For large animal flood rescue: call SES on 132 500. They coordinate boats and large animal rescue equipment.' });
  } else if (state.hazard === 'drought') {
    hazardNote = alertHTML({ type: 'warning', heading: 'Drought assistance', body: 'Contact your state agriculture department for emergency drought support, hay assistance, and welfare programs.' });
  }

  return `<h2>${node.title}</h2>
    <p class="subtitle">Enter your postcode to show services in your area.</p>
    ${hazardNote}
    <div class="postcode-row">
      <input type="text" id="postcode-input" placeholder="e.g. 4350" maxlength="4"
        inputmode="numeric" pattern="[0-9]{4}" autocomplete="postal-code"
        aria-label="Australian postcode" onkeydown="if(event.key==='Enter') lookupContacts()" />
      <button onclick="lookupContacts()">Search</button>
    </div>
    <div id="contact-results"></div>
    <div class="divider"></div>
    <div class="section-label">National contacts — always available</div>
    ${NATIONAL_CONTACTS.map(contactCardHTML).join('')}`;
}

function contactCardHTML(c) {
  const cls = c.urgent ? ' urgent' : '';
  let actions = '';
  if (c.phone) actions += `<a href="tel:${c.phone.replace(/\s/g,'')}" aria-label="Call ${c.name}"><i class="ti ti-phone" aria-hidden="true"></i> ${c.phone}</a>`;
  if (c.url)   actions += `<a href="${c.url}" target="_blank" rel="noopener noreferrer" aria-label="${c.name} website"><i class="ti ti-external-link" aria-hidden="true"></i> Website</a>`;
  return `
    <div class="contact-card${cls}">
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
      <p>Postcode not recognised. Use the national contacts below or try the WIRES rescuer finder.</p>
    </div>`;
    return;
  }

  const contacts = STATE_CONTACTS[stateCode] || [];
  let html = `<div class="section-label">Services near postcode ${pc} (${stateCode})</div>`;
  contacts.forEach(c => { html += contactCardHTML(c); });
  html += `<div class="divider"></div>`;
  el.innerHTML = html;
}

// ─── NAVIGATION ──────────────────────────────────────────────────────────────

function choose(nextId, value) {
  const current = state.history[state.history.length - 1] || 'welcome';

  // Track state values
  if (current === 'welcome')        state.role          = value || state.role;
  if (current === 'hazardType')     state.hazard        = value || state.hazard;
  if (current === 'animalCategory') state.animalCategory = value || state.animalCategory;
  if (current === 'nativeMammalType') state.animalSubtype = value || state.animalSubtype;
  if (current === 'reptileType')    state.animalSubtype = value || state.animalSubtype;
  if (current === 'condition')      state.condition     = value || state.condition;

  goto(nextId);
}

function goto(id) {
  if (state.history[state.history.length - 1] !== id) {
    state.history.push(id);
  }
  renderScreen(id);
}

function goBack() {
  if (state.history.length <= 1) return;
  state.history.pop();
  const prev = state.history[state.history.length - 1] || 'welcome';
  renderScreen(prev);
}

function restart() {
  state.role = 'public';
  state.hazard = null;
  state.animalCategory = null;
  state.animalSubtype = null;
  state.condition = null;
  state.history = [];
  goto('welcome');
}

// Escape key goes back
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') goBack();
});

// ─── BOOT ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => goto('welcome'));
