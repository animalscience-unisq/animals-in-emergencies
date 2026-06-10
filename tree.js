// Wildlife Emergency Decision Tree — Data
// Edit this file to update content, contacts, or add new branches

const TREE = {

  // ─── ROLE SELECTION ────────────────────────────────────────────────────────
  welcome: {
    id: 'welcome',
    title: 'Wildlife emergency guide',
    subtitle: 'Step-by-step guidance for injured or endangered native wildlife in rural and regional Australia.',
    warning: {
      type: 'danger',
      heading: 'Your safety comes first',
      body: 'Do not approach any animal until this tool confirms it is safe to do so. Some animals cause serious injury.'
    },
    question: 'I am:',
    choices: [
      { label: 'A member of the public', sub: 'I found an injured animal', value: 'public', icon: 'ti-user', next: 'scene' },
      { label: 'A wildlife worker / ranger / vet / farmer', sub: 'I have experience handling animals', value: 'professional', icon: 'ti-shield-check', next: 'scene' }
    ]
  },

  // ─── SCENE SAFETY ───────────────────────────────────────────────────────────
  scene: {
    id: 'scene',
    phase: 'Human safety',
    phaseClass: 'urgent',
    title: 'Is the scene safe for you?',
    subtitle: 'Check your immediate surroundings before approaching.',
    info: {
      type: 'danger',
      body: 'Hazards: moving traffic, road edge, floodwater, unstable terrain, powerlines, or the animal itself (hooves, claws, beak, venom).'
    },
    question: 'Is the scene safe?',
    choices: [
      { label: 'Yes — scene is safe', icon: 'ti-check', color: 'green', next: 'animalType' },
      { label: 'No — there is a hazard present', icon: 'ti-x', color: 'red', next: 'unsafeScene' },
      { label: 'The animal is on or near a road', icon: 'ti-car', color: 'amber', next: 'roadHazard' }
    ]
  },

  unsafeScene: {
    id: 'unsafeScene',
    phase: 'Do not approach',
    phaseClass: 'urgent',
    title: 'Stay back — secure the scene first',
    steps: [
      'Do not approach the animal or enter the hazard zone.',
      'Road hazard: pull over safely, turn on hazard lights, stay in your vehicle if traffic is moving.',
      'Powerlines down: stay 8 metres clear and call 000 immediately.',
      'Floodwater or unstable terrain: do not enter. Call wildlife rescue and give your GPS location.',
      'Once you have made the area as safe as possible, proceed to identify the animal.'
    ],
    info: {
      type: 'info',
      body: 'If you cannot make the scene safe, call 000 or a wildlife rescue service and monitor from a distance until help arrives.'
    },
    choices: [
      { label: 'Scene is now safe — continue', icon: 'ti-arrow-right', color: 'green', next: 'animalType' }
    ]
  },

  roadHazard: {
    id: 'roadHazard',
    phase: 'Road safety',
    phaseClass: 'caution',
    title: 'Animal on or near a road',
    steps: [
      'Pull well off the road. Turn on hazard lights.',
      'Do not stand on the road. Stay on the verge at all times.',
      'On highways or high-speed roads: do not handle the animal yourself. Call wildlife rescue.',
      'Large dead animal (kangaroo, wombat, deer): check the pouch for live joeys.',
      'Notify your state road authority if the carcass is a traffic hazard.'
    ],
    choices: [
      { label: 'Continue to identify the animal', icon: 'ti-arrow-right', color: 'green', next: 'animalType' }
    ]
  },

  // ─── ANIMAL IDENTIFICATION ──────────────────────────────────────────────────
  animalType: {
    id: 'animalType',
    phase: 'Animal assessment',
    phaseClass: 'ok',
    title: 'What kind of animal is it?',
    subtitle: 'Choose the closest match. If unsure, pick the category that looks most similar.',
    question: 'Animal type:',
    choices: [
      { label: 'Kangaroo / wallaby / wallaroo', sub: 'Macropod — hopping animal with pouch', icon: 'ti-paw', color: 'amber', value: 'macropod', next: 'animalDanger' },
      { label: 'Wombat / echidna / possum / koala', sub: 'Other native mammal', icon: 'ti-paw', color: 'amber', value: 'wombat', next: 'animalDanger' },
      { label: 'Bat / flying fox / microbat', sub: '⚠ Requires vaccination — do not handle', icon: 'ti-paw', color: 'red', value: 'bat', next: 'batWarning' },
      { label: 'Bird', sub: 'Native or migratory — raptors need extra care', icon: 'ti-feather', color: 'blue', value: 'bird', next: 'animalDanger' },
      { label: 'Snake / lizard / turtle', sub: '⚠ Snakes may be venomous — caution required', icon: 'ti-alert-triangle', color: 'red', value: 'reptile', next: 'reptileWarning' },
      { label: 'Marine animal', sub: 'Seal, dolphin, whale, turtle, seabird', icon: 'ti-wave-square', color: 'blue', value: 'marine', next: 'animalDanger' },
      { label: 'Introduced / feral animal', sub: 'Rabbit, fox, cat, deer, pig, goat', icon: 'ti-circle-dashed', color: 'gray', value: 'introduced', next: 'introduced' }
    ]
  },

  // ─── SPECIAL ANIMAL PATHS ───────────────────────────────────────────────────
  batWarning: {
    id: 'batWarning',
    phase: 'Do not touch',
    phaseClass: 'urgent',
    title: 'Bats require specialist handling',
    alert: {
      type: 'danger',
      heading: 'Australian Bat Lyssavirus (ABLV)',
      body: 'All Australian bats should be treated as potential ABLV carriers — this disease is fatal if untreated. Only vaccinated and trained carers may handle bats.'
    },
    steps: [
      'Do not touch or handle the bat under any circumstances.',
      'If you or anyone has been scratched, bitten, or had bat saliva contact mucous membranes: wash with soap and water for at least 15 minutes and go to hospital immediately.',
      'Keep people and pets well away.',
      'Call a bat-specific wildlife rescue service — they will be vaccinated and equipped.'
    ],
    choices: [
      { label: 'Get contact information', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  reptileWarning: {
    id: 'reptileWarning',
    phase: 'Caution',
    phaseClass: 'urgent',
    title: 'Reptile — snake or lizard?',
    choices: [
      { label: 'Snake', sub: 'Assume venomous — never handle', icon: 'ti-alert-triangle', color: 'red', value: 'snake', next: 'snakeGuide' },
      { label: 'Lizard / blue-tongue / goanna / turtle', sub: 'Lower risk — proceed with care', icon: 'ti-paw', color: 'amber', value: 'lizard', next: 'animalDanger' }
    ]
  },

  snakeGuide: {
    id: 'snakeGuide',
    phase: 'High risk',
    phaseClass: 'urgent',
    title: 'Injured snake — do not handle',
    alert: {
      type: 'danger',
      body: 'Australia has many of the world\'s most venomous snakes. An injured snake is still fully capable of biting. Do not attempt to pick it up, pin it, or move it.'
    },
    steps: [
      'Keep at least 2 metres away. A snake can strike roughly its own body length.',
      'Keep children and pets well away.',
      'If indoors: close the room, seal the gap under the door with a towel. Do not open windows.',
      'Call a licensed snake catcher or wildlife rescue service — do not attempt relocation yourself.',
      'If someone is bitten: apply a pressure immobilisation bandage, keep still, call 000 immediately.'
    ],
    choices: [
      { label: 'Get contact information', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  introduced: {
    id: 'introduced',
    phase: 'Introduced species',
    phaseClass: 'caution',
    title: 'Introduced or feral animals',
    subtitle: 'Introduced species (rabbits, foxes, feral cats, deer, pigs, goats) are generally not covered by wildlife rescue organisations. Guidance varies by species and context.',
    choices: [
      { label: 'Injured — needs immediate help', icon: 'ti-heart', color: 'amber', value: 'feral-injured', next: 'introducedInjured' },
      { label: 'Nuisance / causing property or stock damage', icon: 'ti-alert-triangle', color: 'gray', value: 'feral-nuisance', next: 'introducedNuisance' },
      { label: 'Domestic animal (dog, cat, livestock) — lost or injured', icon: 'ti-home', color: 'blue', value: 'domestic', next: 'domestic' }
    ]
  },

  introducedInjured: {
    id: 'introducedInjured',
    phase: 'Injured introduced animal',
    phaseClass: 'caution',
    title: 'Options for injured introduced animals',
    steps: [
      'Contact your local vet — most will assess any animal in distress regardless of species.',
      'Contact your local council — they manage feral and stray animals in many areas.',
      'RSPCA can assist with domestic or introduced species in some regions.',
      'Large feral animals on roads causing a traffic hazard: contact local police, who can authorise humane dispatch.'
    ],
    choices: [
      { label: 'Find local contacts', icon: 'ti-arrow-right', color: 'green', next: 'contacts' }
    ]
  },

  introducedNuisance: {
    id: 'introducedNuisance',
    phase: 'Feral animal — damage',
    phaseClass: 'caution',
    title: 'Feral animal causing damage',
    steps: [
      'Contact your local council — they have pest management programs and can advise on legal control methods.',
      'Contact your state agriculture department for stock damage or crop destruction.',
      'Landholders generally have legal authority to control feral animals on their property — check your state\'s biosecurity legislation.',
      'For coordinated programs (baiting, trapping): contact your Landcare group or Local Land Services (NSW) / equivalent state body.'
    ],
    choices: [
      { label: 'Find local contacts', icon: 'ti-arrow-right', color: 'green', next: 'contacts' }
    ]
  },

  domestic: {
    id: 'domestic',
    phase: 'Domestic animal',
    phaseClass: 'ok',
    title: 'Lost or injured domestic animal',
    steps: [
      'Take the animal to the nearest vet if injured. Vets are obligated to provide emergency triage.',
      'Check for a microchip — any vet or council ranger can scan for free.',
      'Report to your local council pound / ranger service.',
      'Lost livestock: contact local police and check for ear tags or brands to identify the owner.'
    ],
    choices: [
      { label: 'Find local contacts', icon: 'ti-arrow-right', color: 'green', next: 'contacts' }
    ]
  },

  // ─── APPROACH SAFETY ────────────────────────────────────────────────────────
  animalDanger: {
    id: 'animalDanger',
    phase: 'Safe approach',
    phaseClass: 'caution',
    title: 'Is the animal showing defensive behaviour?',
    subtitle: 'Signs: hissing, growling, lunging, raising wings, raised fur, bared teeth, fixed eye contact, or a kangaroo balancing on its tail.',
    choices: [
      { label: 'No — calm or weak', icon: 'ti-check', color: 'green', next: 'condition' },
      { label: 'Yes — defensive or aggressive', icon: 'ti-alert-triangle', color: 'red', next: 'aggressiveAnimal' }
    ]
  },

  aggressiveAnimal: {
    id: 'aggressiveAnimal',
    phase: 'Do not approach',
    phaseClass: 'urgent',
    title: 'Defensive or aggressive animal',
    alert: {
      type: 'danger',
      body: 'Do not approach. Even small animals inflict serious injuries when stressed or cornered. A large kangaroo can disembowel a person.'
    },
    steps: [
      'Back away slowly. No sudden movements or loud noises.',
      'Do not corner the animal — it must always have an escape route.',
      'Call a wildlife rescue service. A trained carer can assess and restrain safely.',
      '[PROFESSIONAL] Only approach if you have appropriate restraint equipment and protective gear.'
    ],
    choices: [
      { label: 'Continue to get contacts', icon: 'ti-arrow-right', color: 'green', next: 'contacts' }
    ]
  },

  // ─── CONDITION ASSESSMENT ───────────────────────────────────────────────────
  condition: {
    id: 'condition',
    phase: 'Condition',
    phaseClass: 'ok',
    title: 'What is the animal\'s condition?',
    choices: [
      { label: 'Critical', sub: 'Unconscious, severely bleeding, not breathing well, unable to move', icon: 'ti-heartbeat', color: 'red', value: 'critical', next: 'critical' },
      { label: 'Injured but conscious', sub: 'Visible wound, broken limb, can\'t use a wing or leg', icon: 'ti-bandage', color: 'amber', value: 'injured', next: 'injured' },
      { label: 'Juvenile / orphan', sub: 'Very young, alone, no parent seen for over an hour', icon: 'ti-baby-carriage', color: 'teal', value: 'orphan', next: 'orphan' },
      { label: 'Distressed but no visible injury', sub: 'Disoriented, weak, stunned (e.g. window strike)', icon: 'ti-mood-sad', color: 'amber', value: 'distressed', next: 'distressed' },
      { label: 'Appears deceased', sub: 'Check pouch for joeys before leaving', icon: 'ti-circle-dashed', color: 'gray', value: 'dead', next: 'deceased' }
    ]
  },

  critical: {
    id: 'critical',
    phase: 'Urgent',
    phaseClass: 'urgent',
    title: 'Critical condition — act now',
    alert: {
      type: 'danger',
      heading: 'Call a wildlife rescue service immediately',
      body: 'Get help coming while you stabilise the animal. Provide your exact location (nearest street address or GPS coordinates).'
    },
    steps: [
      'Only handle if safe. Use thick gloves, a jacket, or a towel as a barrier.',
      'Keep the animal calm, quiet, and warm. Minimise handling and noise.',
      'Do not give food or water — aspiration risk and incorrect nutrition can cause harm.',
      'Place in a ventilated box lined with a soft cloth. Secure the lid.',
      'Keep in a quiet, dark, warm location while waiting for help or transporting.',
      'Do not attempt to splint, bandage wounds, or administer any medication.'
    ],
    choices: [
      { label: 'Find emergency contacts now', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  injured: {
    id: 'injured',
    phase: 'Injured',
    phaseClass: 'caution',
    title: 'Injured animal — first response',
    steps: [
      'Only approach if the animal is calm. Use a thick towel or blanket to cover and pick it up — covering the eyes reduces stress.',
      'Place in a ventilated box lined with a soft cloth. Keep in a dark, quiet, warm space.',
      'Do not treat wounds, remove objects, or apply bandages. Do not give food or water.',
      'Birds: support the body and wings gently. Never hold by the wings or legs alone.',
      'Raptors (hawks, eagles, owls): thick gloves are essential — talons cause serious injury even from an injured bird.',
      'Call a wildlife carer to arrange transport or assessment.'
    ],
    choices: [
      { label: 'Find local contacts', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  orphan: {
    id: 'orphan',
    phase: 'Orphan / juvenile',
    phaseClass: 'caution',
    title: 'Juvenile or orphaned animal',
    info: {
      type: 'info',
      body: 'Many animals that appear abandoned are not. Birds especially leave the nest before they can fly — parents are usually nearby. Observe for at least 30–60 minutes before intervening.'
    },
    steps: [
      'Watch from a distance for 30–60 minutes. If the parent does not return and the animal appears cold, weak, or in immediate danger — intervene.',
      'Joeys in the pouch of a deceased mother may still be alive. Remove gently while still attached to the teat if possible — do not detach forcibly. Wrap joey and pouch contents together in something warm.',
      'Keep warm and quiet. Do not attempt to feed — incorrect formula or method can be fatal.',
      'Contact a wildlife carer immediately — hand-rearing requires specialised skills and appropriate milk formulas.'
    ],
    choices: [
      { label: 'Find a carer near you', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  distressed: {
    id: 'distressed',
    phase: 'Distressed',
    phaseClass: 'caution',
    title: 'Distressed animal — no visible injury',
    steps: [
      'Window-struck birds: place in a ventilated dark box for 30–60 minutes. Many recover with rest. Do not release until alert and upright.',
      'Heat-affected animals (common in summer): move to a cool, shaded area. Offer small amounts of water in a shallow container to a conscious, alert mammal — do not force it.',
      'Disoriented or circling: may indicate head trauma or neurological injury. Handle minimally and call a carer.',
      'Not improved within 1 hour or condition worsening: treat as injured and contact rescue services.'
    ],
    choices: [
      { label: 'Find local contacts', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  deceased: {
    id: 'deceased',
    phase: 'Deceased animal',
    phaseClass: 'gray',
    title: 'Deceased animal',
    steps: [
      'Check the pouch of kangaroos, wallabies, wombats, and possums. Joeys can survive for hours after the mother\'s death. Feel carefully — a joey may be cold and still.',
      'If you find a live joey: keep warm, handle minimally, and call a wildlife carer immediately.',
      'Do not use gloves with strong chemical smells near a joey — unfamiliar scents cause extreme stress.',
      'Report carcass locations to local council or roads authority if a traffic hazard.',
      'Some species are monitored — reporting locations to your state wildlife authority assists conservation data.'
    ],
    choices: [
      { label: 'Find local contacts', icon: 'ti-arrow-right', color: 'green', next: 'contacts' }
    ]
  },

  // ─── CONTACTS ───────────────────────────────────────────────────────────────
  contacts: {
    id: 'contacts',
    phase: 'Local contacts',
    phaseClass: 'ok',
    title: 'Find local rescue services'
  }
};

// ─── CONTACT DIRECTORY ──────────────────────────────────────────────────────
// To add or update contacts, edit this object.
// Key = Australian state/territory code.

const STATE_CONTACTS = {
  QLD: [
    { name: 'RSPCA Queensland', desc: 'Wildlife rescue and rehabilitation across QLD', phone: '1300 264 625', url: 'https://www.rspcaqld.org.au' },
    { name: 'Wildlife Queensland', desc: 'Conservation and rescue support', phone: null, url: 'https://www.wildlife.org.au' },
    { name: 'Australia Zoo Wildlife Hospital', desc: 'Sunshine Coast — major wildlife hospital', phone: '07 5436 2226', url: 'https://www.australiazoo.com.au/conservation/wildlife-hospital/' }
  ],
  NSW: [
    { name: 'WIRES', desc: 'Largest wildlife rescue organisation in NSW — 24/7', phone: '1300 094 737', url: 'https://www.wires.org.au' },
    { name: 'Sydney Wildlife', desc: 'Sydney metro and surrounds', phone: '9413 4300', url: 'https://www.sydneywildlife.org.au' },
    { name: 'Native Animal Trust Fund', desc: 'Hunter / Central West NSW', phone: '1800 108 652', url: 'https://www.nativeanimaltrustfund.org.au' }
  ],
  VIC: [
    { name: 'Wildlife Victoria', desc: '24/7 state emergency response line', phone: '1300 094 535', url: 'https://www.wildlifevictoria.org.au' },
    { name: 'Healesville Sanctuary Wildlife Hospital', desc: 'Eastern VIC — major hospital', phone: '03 5957 2800', url: 'https://www.zoo.org.au/healesville' }
  ],
  SA: [
    { name: 'Fauna Rescue SA', desc: 'South Australia wildlife rescue network', phone: '08 8289 0896', url: 'https://www.faunarescue.org.au' },
    { name: 'Kangaroo Island Wildlife Network', desc: 'KI specific rescue coordination', phone: null, url: 'https://www.kiwildlifenetwork.com.au' }
  ],
  WA: [
    { name: 'Wildcare Helpline (DBCA)', desc: 'WA state government wildlife helpline', phone: '08 9474 9055', url: 'https://www.dbca.wa.gov.au/management/wildlife/injured-and-orphaned-animals' },
    { name: 'Wildlife Care Network WA', desc: 'Volunteer rescue network across WA', phone: null, url: 'https://www.wildlifecarenetwork.com.au' }
  ],
  NT: [
    { name: 'NT Parks and Wildlife', desc: 'Northern Territory government wildlife services', phone: '08 8999 4555', url: 'https://nt.gov.au/environment/animals/injured-animals' }
  ],
  TAS: [
    { name: 'Bonorong Wildlife Sanctuary', desc: 'TAS rescue and rehabilitation — 24/7', phone: '0447 264 625', url: 'https://www.bonorong.com.au' },
    { name: 'DPIPWE Wildlife Management', desc: 'TAS government wildlife authority', phone: '03 6165 4305', url: 'https://www.wildlife.tas.gov.au' }
  ],
  ACT: [
    { name: 'ACT Wildlife', desc: 'ACT region wildlife rescue', phone: '0432 300 033', url: 'https://www.actwildlife.net' },
    { name: 'Wildcare ACT', desc: 'Supplementary ACT/Queanbeyan area', phone: null, url: 'https://wildcare.org.au' }
  ]
};

// National contacts — always shown regardless of postcode
const NATIONAL_CONTACTS = [
  { name: 'Emergency — police / ambulance / fire', desc: 'If the scene is dangerous or a person has been injured by an animal', phone: '000', url: null, urgent: true },
  { name: 'WIRES Wildlife Rescue (24/7 national)', desc: 'Will redirect to your nearest local group', phone: '1300 094 737', url: 'https://www.wires.org.au' },
  { name: 'Wildlife Victoria (24/7)', desc: 'VIC emergency line, also assists with referrals', phone: '1300 094 535', url: 'https://www.wildlifevictoria.org.au' },
  { name: 'RSPCA Australia', desc: 'Cruelty reporting and rescue services nationally', phone: '1300 278 000', url: 'https://www.rspca.org.au' },
  { name: 'WIRES rescuer finder tool', desc: 'Online directory — find the closest rescue group by animal type and postcode', phone: null, url: 'https://www.wires.org.au/wildlife-info/rescue-wildlife' }
];

// Postcode → state mapping
function postcodeToState(pc) {
  const n = parseInt(pc, 10);
  if (n >= 1000 && n <= 2999) return 'NSW';
  if (n >= 3000 && n <= 3999) return 'VIC';
  if (n >= 4000 && n <= 4999) return 'QLD';
  if (n >= 5000 && n <= 5999) return 'SA';
  if (n >= 6000 && n <= 6999) return 'WA';
  if (n >= 7000 && n <= 7999) return 'TAS';
  if (n >= 800  && n <= 899)  return 'NT';
  if (n >= 200  && n <= 299)  return 'ACT';
  return null;
}
