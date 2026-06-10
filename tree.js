// ─── WILDLIFE & LIVESTOCK EMERGENCY DECISION TREE ───────────────────────────
// data/tree.js  —  Edit this file to update content, contacts, or add branches.
// No JS logic knowledge needed for content edits.

const TREE = {

  // ── ROLE SELECTION ──────────────────────────────────────────────────────────
  welcome: {
    id: 'welcome',
    title: 'Animal emergency guide',
    subtitle: 'Step-by-step guidance for injured, endangered, or distressed animals during emergencies in rural and regional Australia.',
    warning: { type: 'danger', heading: 'Your safety comes first', body: 'Do not approach any animal until this tool confirms it is safe to do so.' },
    question: 'I am:',
    choices: [
      { label: 'A member of the public', sub: 'I found an animal in trouble', value: 'public', icon: 'ti-user', color: 'blue', next: 'hazardType' },
      { label: 'A wildlife worker / ranger / vet', sub: 'I have experience handling wildlife', value: 'professional', icon: 'ti-shield-check', color: 'green', next: 'hazardType' },
      { label: 'A farmer / grazier / livestock owner', sub: 'My own or neighbouring stock are affected', value: 'farmer', icon: 'ti-tractor', color: 'amber', next: 'hazardType' }
    ]
  },

  // ── HAZARD / EMERGENCY TYPE ─────────────────────────────────────────────────
  hazardType: {
    id: 'hazardType',
    phase: 'Emergency type',
    phaseClass: 'urgent',
    title: 'What type of emergency is this?',
    subtitle: 'This determines safety actions and response priorities before you approach any animal.',
    question: 'Emergency type:',
    choices: [
      { label: 'Bushfire', sub: 'Active fire, smoke, or post-fire animal rescue', icon: 'ti-flame', color: 'red', value: 'bushfire', next: 'sceneBushfire' },
      { label: 'Flood', sub: 'Rising water, stranded animals, or post-flood', icon: 'ti-droplet', color: 'blue', value: 'flood', next: 'sceneFlood' },
      { label: 'Heatwave', sub: 'Extreme heat, heat stress, or dehydration', icon: 'ti-sun', color: 'amber', value: 'heatwave', next: 'sceneHeatwave' },
      { label: 'Drought', sub: 'Prolonged water or feed shortage', icon: 'ti-cloud-off', color: 'gray', value: 'drought', next: 'sceneDrought' },
      { label: 'Storm / cyclone', sub: 'High winds, lightning, storm damage', icon: 'ti-storm', color: 'blue', value: 'storm', next: 'sceneStorm' },
      { label: 'Vehicle strike', sub: 'Animal hit by a car or truck', icon: 'ti-car', color: 'amber', value: 'vehicle', next: 'sceneVehicle' },
      { label: 'Entanglement / fence injury', sub: 'Caught in wire, netting, or fencing', icon: 'ti-git-merge', color: 'amber', value: 'entanglement', next: 'sceneEntanglement' },
      { label: 'No specific emergency', sub: 'Injured or unwell animal — no major hazard', icon: 'ti-first-aid-kit', color: 'green', value: 'general', next: 'sceneGeneral' }
    ]
  },

  // ── SCENE SAFETY — BUSHFIRE ─────────────────────────────────────────────────
  sceneBushfire: {
    id: 'sceneBushfire',
    phase: 'Human safety — bushfire',
    phaseClass: 'urgent',
    title: 'Bushfire — scene safety first',
    alert: { type: 'danger', heading: 'Do not enter an active fire zone', body: 'Animal rescue during an active bushfire must only be attempted by trained emergency services. Your life is not worth risking for any animal.' },
    steps: [
      'Check your local fire authority app (e.g. Fires Near Me NSW, VicEmergency, QLD Fire) for current fire status before proceeding.',
      'Only enter a fire-affected area if the fire front has passed and authorities have declared it safe.',
      'Watch for hazards: fallen powerlines, unstable trees, smouldering ground, toxic smoke, hot ash.',
      'Wear long sleeves, long pants, leather boots, and a P2/N95 mask if available.',
      'Have a clear exit route planned before you enter.',
      'Tell someone where you are going and when to expect you back.',
      'If fire conditions change while you are on site: leave immediately. Do not attempt further rescue.'
    ],
    info: { type: 'info', body: 'Post-fire: animals may be burned, disoriented, dehydrated, or sheltering in unusual locations. Move slowly and quietly — stressed animals can behave unpredictably.' },
    choices: [
      { label: 'Scene is safe — continue', icon: 'ti-arrow-right', color: 'green', next: 'animalCategory' },
      { label: 'Fire is still active — get emergency contacts', icon: 'ti-phone', color: 'red', next: 'contacts' }
    ]
  },

  // ── SCENE SAFETY — FLOOD ────────────────────────────────────────────────────
  sceneFlood: {
    id: 'sceneFlood',
    phase: 'Human safety — flood',
    phaseClass: 'urgent',
    title: 'Flood — scene safety first',
    alert: { type: 'danger', heading: 'Never enter floodwater on foot or by vehicle', body: 'Just 15cm of moving water can knock an adult over. 30cm can sweep away a vehicle. Floodwater may contain hidden debris, snakes, chemicals, and sewage.' },
    steps: [
      'Do not drive or walk into floodwater under any circumstances.',
      'Contact the SES (132 500) — they coordinate large animal flood rescue and have the correct equipment.',
      'Check the BOM flood warnings and your state emergency services app before approaching.',
      'If the animal is stranded on high ground and the water is stable (not rising): you may be able to approach on foot from higher ground only.',
      'Snakes and other animals are displaced by floods and seek high ground — check before stepping anywhere.',
      'Do not attempt to swim to a stranded animal.',
      'Mark the GPS location of stranded animals and report to SES or local animal rescue services.'
    ],
    info: { type: 'warning', body: 'Post-flood: animals may be exhausted, hypothermic, injured from debris, or contaminated with floodwater chemicals. Handle with gloves.' },
    choices: [
      { label: 'Water is stable — scene is accessible', icon: 'ti-arrow-right', color: 'green', next: 'animalCategory' },
      { label: 'Active flooding — get emergency contacts', icon: 'ti-phone', color: 'red', next: 'contacts' }
    ]
  },

  // ── SCENE SAFETY — HEATWAVE ─────────────────────────────────────────────────
  sceneHeatwave: {
    id: 'sceneHeatwave',
    phase: 'Human safety — heatwave',
    phaseClass: 'caution',
    title: 'Heatwave — scene safety first',
    steps: [
      'Protect yourself first: drink water, wear a hat, stay in shade where possible.',
      'Do not leave your vehicle running unattended in high heat if animals are being transported inside.',
      'Heat-affected animals can be unpredictable — a horse or cow in heat stress may panic suddenly.',
      'Work quickly but calmly — minimise your own exertion in extreme heat.'
    ],
    info: { type: 'info', body: 'Heat stress in animals is time-critical. Even short delays worsen outcomes. Prioritise getting water and shade to affected animals as fast as possible.' },
    choices: [
      { label: 'Continue to identify the animal', icon: 'ti-arrow-right', color: 'green', next: 'animalCategory' }
    ]
  },

  // ── SCENE SAFETY — DROUGHT ──────────────────────────────────────────────────
  sceneDrought: {
    id: 'sceneDrought',
    phase: 'Drought',
    phaseClass: 'caution',
    title: 'Drought — assess the situation',
    steps: [
      'Drought is an ongoing emergency — triage is important. Prioritise the most severely affected animals first.',
      'Severely emaciated animals that are recumbent (lying down and unable to rise) may be in organ failure — veterinary assessment is required before attempting to feed or rehydrate.',
      'Refeeding starved animals incorrectly can be fatal. Do not give large amounts of feed suddenly.',
      'Ensure water is available before feed — dehydration is usually the most urgent issue.',
      'Contact your vet or local emergency animal welfare service for triage guidance on large numbers of animals.'
    ],
    choices: [
      { label: 'Continue to identify the animal', icon: 'ti-arrow-right', color: 'green', next: 'animalCategory' }
    ]
  },

  // ── SCENE SAFETY — STORM ────────────────────────────────────────────────────
  sceneStorm: {
    id: 'sceneStorm',
    phase: 'Human safety — storm',
    phaseClass: 'urgent',
    title: 'Storm / cyclone — scene safety first',
    alert: { type: 'danger', heading: 'Do not approach during active storm conditions', body: 'Wait until the storm has fully passed. Fallen powerlines, unstable trees, and flash flooding remain hazards after the storm front moves through.' },
    steps: [
      'Do not approach downed powerlines — stay at least 8 metres clear and call 000.',
      'Check for unstable trees, damaged structures, or debris before entering paddocks.',
      'Lightning: if a storm is still active, stay inside a vehicle or building.',
      'Animals may be trapped under fallen fencing, trees, or structures — approach carefully.',
      'Horses in particular may panic during and after storms — approach slowly and use a calm voice.'
    ],
    choices: [
      { label: 'Storm has passed — scene is safe', icon: 'ti-arrow-right', color: 'green', next: 'animalCategory' },
      { label: 'Storm still active — get emergency contacts', icon: 'ti-phone', color: 'red', next: 'contacts' }
    ]
  },

  // ── SCENE SAFETY — VEHICLE STRIKE ───────────────────────────────────────────
  sceneVehicle: {
    id: 'sceneVehicle',
    phase: 'Human safety — road',
    phaseClass: 'urgent',
    title: 'Vehicle strike — road safety first',
    steps: [
      'Pull well off the road. Turn on hazard lights immediately.',
      'Do not stand on the road — stay on the verge at all times.',
      'On highways or high-speed roads: do not attempt to handle large animals yourself.',
      'Large animals (horses, cattle, kangaroos) on roads are a serious traffic hazard — warn oncoming traffic if safe to do so.',
      'Call 000 if the animal is causing an active danger to traffic.',
      'Check the pouch of deceased macropods (kangaroos, wallabies) — joeys survive for hours after the mother dies.',
      'Notify your state road authority or local council if a carcass remains a hazard.'
    ],
    choices: [
      { label: 'Scene is safe — continue', icon: 'ti-arrow-right', color: 'green', next: 'animalCategory' }
    ]
  },

  // ── SCENE SAFETY — ENTANGLEMENT ─────────────────────────────────────────────
  sceneEntanglement: {
    id: 'sceneEntanglement',
    phase: 'Entanglement',
    phaseClass: 'caution',
    title: 'Entanglement — assess before approaching',
    steps: [
      'Do not rush in — a panicking entangled animal can seriously injure itself and you by thrashing.',
      'Assess what the animal is caught in: wire, netting, rope, barbed wire, or fencing.',
      'Gather wire cutters, bolt cutters, or scissors before approaching.',
      'For large animals (horses, cattle): call a vet or experienced handler — sedation may be required to free them safely.',
      'Approach slowly and calmly. Speak quietly. Cover the animal\'s eyes if possible to reduce panic.',
      'Cut material away from the animal — do not pull the animal free, as this worsens injuries.',
      'Once free, do not release immediately — assess injuries and prevent the animal running into danger.'
    ],
    info: { type: 'warning', body: 'Barbed wire causes severe lacerations. Even after freeing, deep wire wounds require veterinary assessment — wounds that appear small on the surface can be deep.' },
    choices: [
      { label: 'Continue to identify the animal', icon: 'ti-arrow-right', color: 'green', next: 'animalCategory' }
    ]
  },

  // ── SCENE SAFETY — GENERAL ──────────────────────────────────────────────────
  sceneGeneral: {
    id: 'sceneGeneral',
    phase: 'Human safety',
    phaseClass: 'caution',
    title: 'Check the scene is safe',
    steps: [
      'Check your surroundings before approaching: traffic, uneven terrain, other animals nearby.',
      'Consider the animal itself as a hazard — even small animals bite and scratch when stressed.',
      'Large animals (horses, cattle, kangaroos) can cause fatal injuries. Approach only if calm.',
      'Bats: do not touch under any circumstances — see bat-specific guidance.'
    ],
    choices: [
      { label: 'Scene is safe — continue', icon: 'ti-arrow-right', color: 'green', next: 'animalCategory' }
    ]
  },

  // ── ANIMAL CATEGORY ─────────────────────────────────────────────────────────
  animalCategory: {
    id: 'animalCategory',
    phase: 'Animal type',
    phaseClass: 'ok',
    title: 'What type of animal is it?',
    subtitle: 'Choose the closest match.',
    question: 'Animal category:',
    choices: [
      { label: 'Wildlife — native mammal', sub: 'Kangaroo, wallaby, wombat, possum, koala, echidna', icon: 'ti-paw', color: 'amber', value: 'nativeMammal', next: 'nativeMammalType' },
      { label: 'Wildlife — bat', sub: '⚠ Do not touch — lyssavirus risk', icon: 'ti-alert-triangle', color: 'red', value: 'bat', next: 'batWarning' },
      { label: 'Wildlife — bird', sub: 'Native or migratory — raptors need extra care', icon: 'ti-feather', color: 'blue', value: 'bird', next: 'animalDanger' },
      { label: 'Wildlife — reptile', sub: '⚠ Snakes may be venomous', icon: 'ti-alert-triangle', color: 'red', value: 'reptile', next: 'reptileType' },
      { label: 'Wildlife — marine animal', sub: 'Seal, dolphin, whale, turtle, seabird', icon: 'ti-wave-square', color: 'blue', value: 'marine', next: 'marineGuide' },
      { label: 'Livestock — cattle', sub: 'Including calves', icon: 'ti-tractor', color: 'amber', value: 'cattle', next: 'livestockCattle' },
      { label: 'Livestock — horse / donkey', sub: 'Including foals', icon: 'ti-tractor', color: 'amber', value: 'horse', next: 'livestockHorse' },
      { label: 'Livestock — sheep / goat', sub: 'Including lambs and kids', icon: 'ti-tractor', color: 'amber', value: 'sheep', next: 'livestockSheep' },
      { label: 'Livestock — pig', sub: 'Domestic pig', icon: 'ti-tractor', color: 'amber', value: 'pig', next: 'livestockPig' },
      { label: 'Livestock — poultry', sub: 'Chickens, ducks, turkeys, geese', icon: 'ti-feather', color: 'amber', value: 'poultry', next: 'livestockPoultry' },
      { label: 'Domestic animal', sub: 'Dog, cat, pet bird, or other pet', icon: 'ti-home', color: 'blue', value: 'domestic', next: 'domesticAnimal' },
      { label: 'Feral / introduced animal', sub: 'Fox, rabbit, feral cat, deer, feral pig, goat', icon: 'ti-circle-dashed', color: 'gray', value: 'feral', next: 'feralAnimal' }
    ]
  },

  // ── NATIVE MAMMAL SUBTYPE ───────────────────────────────────────────────────
  nativeMammalType: {
    id: 'nativeMammalType',
    phase: 'Native mammal',
    phaseClass: 'ok',
    title: 'Which native mammal?',
    choices: [
      { label: 'Kangaroo / wallaby / wallaroo', sub: 'Macropod — check pouch if deceased', icon: 'ti-paw', color: 'amber', value: 'macropod', next: 'animalDanger' },
      { label: 'Wombat', sub: 'Check pouch if deceased', icon: 'ti-paw', color: 'amber', value: 'wombat', next: 'animalDanger' },
      { label: 'Possum / glider', sub: 'Check pouch if deceased', icon: 'ti-paw', color: 'amber', value: 'possum', next: 'animalDanger' },
      { label: 'Koala', sub: 'Handle with care — chlamydia risk with mucous contact', icon: 'ti-paw', color: 'amber', value: 'koala', next: 'koalaGuide' },
      { label: 'Echidna', sub: 'Spines — use thick gloves', icon: 'ti-paw', color: 'amber', value: 'echidna', next: 'echidnaGuide' }
    ]
  },

  // ── KOALA GUIDE ─────────────────────────────────────────────────────────────
  koalaGuide: {
    id: 'koalaGuide',
    phase: 'Koala',
    phaseClass: 'caution',
    title: 'Injured koala — handling guidance',
    info: { type: 'warning', body: 'Koalas can carry Chlamydia. Avoid contact with eyes, nose, or mouth. Wash hands thoroughly after handling. Use gloves if available.' },
    steps: [
      'Do not approach a koala that is in a tree and not showing signs of distress — they are often just resting.',
      'Signs of injury or illness: on the ground, weeping eyes, wet bottom, visible wounds, lethargic, or has been in a bushfire area.',
      'Use a thick towel or blanket to pick up — cover the head to reduce stress.',
      'Place in a ventilated box with a cloth lining. Do not give eucalyptus leaves — only a specialist carer should provide food.',
      'Keep cool in hot weather — koalas are highly heat-sensitive.',
      'Call a koala-specific rescue service or wildlife carer immediately.'
    ],
    choices: [
      { label: 'Find local contacts', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  // ── ECHIDNA GUIDE ───────────────────────────────────────────────────────────
  echidnaGuide: {
    id: 'echidnaGuide',
    phase: 'Echidna',
    phaseClass: 'caution',
    title: 'Injured echidna — handling guidance',
    steps: [
      'Use thick leather gloves or fold a towel into multiple layers — spines penetrate thin material easily.',
      'Do not attempt to unroll a curled echidna — this causes stress and injury.',
      'Place in a ventilated box. Do not offer food or water.',
      'Check for a pouch — a puggle (baby echidna) may be present.',
      'Echidnas overheat quickly — keep in a cool, shaded location.',
      'Call a wildlife carer — echidnas are specialists to care for.'
    ],
    choices: [
      { label: 'Find local contacts', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  // ── BAT WARNING ─────────────────────────────────────────────────────────────
  batWarning: {
    id: 'batWarning',
    phase: 'Do not touch',
    phaseClass: 'urgent',
    title: 'Bats — specialist handling only',
    alert: { type: 'danger', heading: 'Australian Bat Lyssavirus (ABLV)', body: 'All Australian bats should be treated as potential ABLV carriers. This disease is fatal if untreated. Only vaccinated and trained carers may handle bats.' },
    steps: [
      'Do not touch or handle the bat under any circumstances.',
      'If you have been scratched, bitten, or had bat saliva contact mucous membranes: wash thoroughly with soap and water for at least 15 minutes and go to hospital immediately.',
      'Keep people and pets away.',
      'Call a bat-specific wildlife rescue service — they will be vaccinated and equipped.'
    ],
    choices: [
      { label: 'Get contact information', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  // ── REPTILE TYPE ────────────────────────────────────────────────────────────
  reptileType: {
    id: 'reptileType',
    phase: 'Reptile',
    phaseClass: 'urgent',
    title: 'Snake or other reptile?',
    choices: [
      { label: 'Snake', sub: 'Assume venomous — do not handle', icon: 'ti-alert-triangle', color: 'red', value: 'snake', next: 'snakeGuide' },
      { label: 'Lizard / blue-tongue / goanna', sub: 'Lower risk — proceed with care', icon: 'ti-paw', color: 'amber', value: 'lizard', next: 'animalDanger' },
      { label: 'Freshwater or marine turtle', sub: 'Road crossing or stranded', icon: 'ti-paw', color: 'amber', value: 'turtle', next: 'turtleGuide' }
    ]
  },

  // ── SNAKE GUIDE ─────────────────────────────────────────────────────────────
  snakeGuide: {
    id: 'snakeGuide',
    phase: 'High risk',
    phaseClass: 'urgent',
    title: 'Injured snake — do not handle',
    alert: { type: 'danger', body: 'Australia has many of the world\'s most venomous snakes. An injured snake is fully capable of biting. Do not pick it up, pin it, or attempt to move it.' },
    steps: [
      'Keep at least 2 metres away — a snake can strike roughly its own body length.',
      'Keep children and pets well away.',
      'If indoors: close the room, seal the gap under the door with a towel. Do not open windows.',
      'Call a licensed snake catcher — do not attempt relocation yourself.',
      'If someone is bitten: apply a pressure immobilisation bandage, keep still, call 000 immediately. Do not cut, suck, or wash the bite site.'
    ],
    choices: [
      { label: 'Get contact information', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  // ── TURTLE GUIDE ────────────────────────────────────────────────────────────
  turtleGuide: {
    id: 'turtleGuide',
    phase: 'Turtle',
    phaseClass: 'caution',
    title: 'Turtle — road crossing or stranded',
    steps: [
      'Road crossing: carry the turtle to the side of the road it was heading toward — not back where it came from.',
      'Hold firmly with two hands around the shell. Some species can bite or scratch.',
      'Do not put a freshwater turtle into saltwater or vice versa.',
      'Marine turtles stranded on a beach: call wildlife rescue or ORRCA (NSW) / equivalent — do not push back into water without guidance.',
      'Injured turtle (cracked shell, wounds): wrap loosely in a damp cloth. Keep moist and call a wildlife carer.'
    ],
    choices: [
      { label: 'Find local contacts', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  // ── MARINE ANIMAL GUIDE ─────────────────────────────────────────────────────
  marineGuide: {
    id: 'marineGuide',
    phase: 'Marine animal',
    phaseClass: 'caution',
    title: 'Marine animal — stranded or injured',
    choices: [
      { label: 'Dolphin or whale — stranded', icon: 'ti-wave-square', color: 'blue', value: 'cetacean', next: 'cetaceanGuide' },
      { label: 'Seal or sea lion', icon: 'ti-paw', color: 'blue', value: 'seal', next: 'sealGuide' },
      { label: 'Marine turtle', icon: 'ti-paw', color: 'blue', value: 'marineTurtle', next: 'turtleGuide' },
      { label: 'Seabird (penguin, albatross, gannet)', icon: 'ti-feather', color: 'blue', value: 'seabird', next: 'animalDanger' }
    ]
  },

  cetaceanGuide: {
    id: 'cetaceanGuide',
    phase: 'Whale / dolphin',
    phaseClass: 'urgent',
    title: 'Stranded dolphin or whale',
    alert: { type: 'danger', heading: 'Call ORRCA or your state marine rescue immediately', body: 'Cetacean strandings require expert coordination. Do not attempt to push the animal back into the water without guidance — incorrect re-floating can be fatal.' },
    steps: [
      'Call the relevant authority immediately (ORRCA in NSW: 02 9415 3333, DBCA in WA: 08 9474 9055).',
      'Keep the animal upright if possible — do not let it roll onto its side.',
      'Keep the skin wet with seawater using buckets or wet towels, avoiding the blowhole.',
      'Keep bystanders and dogs well back — stressed cetaceans can injure people.',
      'Do not attempt to push or tow the animal back into the water until instructed.'
    ],
    choices: [
      { label: 'Find contacts', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  sealGuide: {
    id: 'sealGuide',
    phase: 'Seal / sea lion',
    phaseClass: 'caution',
    title: 'Seal or sea lion — stranded or injured',
    alert: { type: 'warning', body: 'Seals bite — keep at least 10 metres away. They are faster on land than they appear. Do not attempt to push back into the water.' },
    steps: [
      'Keep people and dogs well away — at least 10 metres.',
      'Seals regularly haul out on beaches to rest — this is normal. Only intervene if the animal has visible injuries, entanglement, or has been ashore for more than 24 hours.',
      'Call ORRCA, your state wildlife authority, or a marine rescue service.',
      'Do not offer food or attempt to pour water over the animal.',
      'Do not push back into the water — if it is sick, it will just re-strand.'
    ],
    choices: [
      { label: 'Find contacts', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  // ── ANIMAL DANGER CHECK ─────────────────────────────────────────────────────
  animalDanger: {
    id: 'animalDanger',
    phase: 'Safe approach',
    phaseClass: 'caution',
    title: 'Is the animal showing defensive behaviour?',
    subtitle: 'Signs: hissing, growling, lunging, raising wings, raised fur, bared teeth, fixed eye contact. A kangaroo balancing on its tail is about to kick.',
    choices: [
      { label: 'No — calm or too weak to react', icon: 'ti-check', color: 'green', next: 'condition' },
      { label: 'Yes — defensive or aggressive', icon: 'ti-alert-triangle', color: 'red', next: 'aggressiveAnimal' }
    ]
  },

  aggressiveAnimal: {
    id: 'aggressiveAnimal',
    phase: 'Do not approach',
    phaseClass: 'urgent',
    title: 'Defensive or aggressive animal',
    alert: { type: 'danger', body: 'Even small animals inflict serious injuries when stressed or cornered. A large kangaroo can disembowel a person. Back away.' },
    steps: [
      'Back away slowly. No sudden movements or loud noises.',
      'Do not corner the animal — always leave an escape route.',
      'Call a wildlife rescue service — a trained carer can assess and restrain safely.',
      '[PROFESSIONAL] Only approach if you have appropriate restraint equipment and protective gear.'
    ],
    choices: [
      { label: 'Animal has calmed — continue', icon: 'ti-check', color: 'green', next: 'condition' },
      { label: 'Get contacts to hand it over', icon: 'ti-phone', color: 'amber', next: 'contacts' }
    ]
  },

  // ── CONDITION ASSESSMENT ────────────────────────────────────────────────────
  condition: {
    id: 'condition',
    phase: 'Condition',
    phaseClass: 'ok',
    title: 'What is the animal\'s condition?',
    choices: [
      { label: 'Critical', sub: 'Unconscious, severely bleeding, not breathing well, unable to move', icon: 'ti-heartbeat', color: 'red', value: 'critical', next: 'critical' },
      { label: 'Injured but conscious', sub: 'Visible wound, broken limb, can\'t use a wing or leg', icon: 'ti-bandage', color: 'amber', value: 'injured', next: 'injured' },
      { label: 'Juvenile / orphan', sub: 'Very young, alone, no parent seen for over an hour', icon: 'ti-baby-carriage', color: 'teal', value: 'orphan', next: 'orphan' },
      { label: 'Distressed but no visible injury', sub: 'Disoriented, weak, stunned, heat-affected', icon: 'ti-mood-sad', color: 'amber', value: 'distressed', next: 'distressed' },
      { label: 'Appears deceased', sub: 'Check pouch for joeys before leaving', icon: 'ti-circle-dashed', color: 'gray', value: 'dead', next: 'deceased' }
    ]
  },

  critical: {
    id: 'critical',
    phase: 'Urgent',
    phaseClass: 'urgent',
    title: 'Critical condition — act now',
    alert: { type: 'danger', heading: 'Call wildlife rescue or a vet immediately', body: 'Get help coming while you stabilise the animal. Provide your exact location — nearest address or GPS coordinates.' },
    steps: [
      'Only handle if safe. Use thick gloves, a jacket, or a towel as a barrier.',
      'Keep the animal calm, quiet, and warm. Minimise handling and noise.',
      'Do not give food or water — aspiration risk, and incorrect nutrition can cause further harm.',
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
    title: 'Injured but conscious — first response',
    steps: [
      'Only approach if the animal is calm. Use a thick towel or blanket to cover and pick it up — covering the eyes reduces stress.',
      'Place in a ventilated box lined with soft cloth. Keep dark, quiet, and warm.',
      'Do not treat wounds, remove objects, or apply bandages. Do not give food or water.',
      'Birds: support the body and wings gently. Never hold by wings or legs alone.',
      'Raptors (hawks, eagles, owls): thick gloves essential — talons cause serious injury even from an injured bird.',
      'Call a wildlife carer or vet to arrange assessment or transport.'
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
    info: { type: 'info', body: 'Many animals that appear abandoned are not. Birds especially leave the nest before they can fly — parents are usually nearby. Observe for 30–60 minutes before intervening.' },
    steps: [
      'Watch from a distance for 30–60 minutes. Only intervene if the parent does not return and the animal is cold, weak, or in immediate danger.',
      'Joeys in the pouch of a deceased mother may still be alive. Remove gently while still attached to the teat — do not detach forcibly. Wrap joey and pouch contents together in something warm.',
      'Keep warm and quiet. Do not attempt to feed — incorrect formula or method can be fatal.',
      'Contact a wildlife carer immediately — hand-rearing requires specialised skills and correct milk formula.'
    ],
    choices: [
      { label: 'Find a carer near you', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  distressed: {
    id: 'distressed',
    phase: 'Distressed',
    phaseClass: 'caution',
    title: 'Distressed — no visible injury',
    steps: [
      'Window-struck birds: place in a ventilated dark box for 30–60 minutes. Many recover with rest. Do not release until alert and upright.',
      'Heat-affected animals: move to a cool shaded area. Offer small amounts of water in a shallow dish to a conscious, alert mammal — do not force it.',
      'Smoke-affected animals (post-fire): keep calm and quiet, minimal handling. Eyes may be inflamed — do not attempt to treat. Get to a vet.',
      'Disoriented or circling: may indicate head trauma or neurological injury. Handle minimally and call a carer.',
      'If not improved within 1 hour or condition worsens: treat as injured and contact rescue services.'
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
      'Check the pouch of kangaroos, wallabies, wombats, and possums — joeys can survive hours after the mother dies. Feel carefully: a joey may be cold and still.',
      'If you find a live joey: keep warm, handle minimally, and call a wildlife carer immediately.',
      'Do not use chemically-scented gloves near a joey — unfamiliar scents cause extreme stress.',
      'Report carcass locations to local council or roads authority if a traffic hazard.',
      'Some species are monitored — reporting locations to your state wildlife authority contributes to conservation data.'
    ],
    choices: [
      { label: 'Find local contacts', icon: 'ti-arrow-right', color: 'green', next: 'contacts' }
    ]
  },

  // ── LIVESTOCK — CATTLE ──────────────────────────────────────────────────────
  livestockCattle: {
    id: 'livestockCattle',
    phase: 'Livestock — cattle',
    phaseClass: 'caution',
    title: 'Cattle — emergency response',
    alert: { type: 'warning', body: 'Cattle in distress are unpredictable and can cause fatal injuries. Do not enter a pen or crush area alone. Do not approach from behind.' },
    choices: [
      { label: 'Bushfire — burns or smoke inhalation', icon: 'ti-flame', color: 'red', value: 'cattle-fire', next: 'cattleFire' },
      { label: 'Flood — stranded or swept animals', icon: 'ti-droplet', color: 'blue', value: 'cattle-flood', next: 'cattleFlood' },
      { label: 'Heat stress', icon: 'ti-sun', color: 'amber', value: 'cattle-heat', next: 'cattleHeat' },
      { label: 'Drought — emaciation or dehydration', icon: 'ti-cloud-off', color: 'gray', value: 'cattle-drought', next: 'cattleDrought' },
      { label: 'Injury — wound, fracture, or entanglement', icon: 'ti-bandage', color: 'amber', value: 'cattle-injury', next: 'cattleInjury' },
      { label: 'Birthing complication (dystocia)', icon: 'ti-baby-carriage', color: 'teal', value: 'cattle-birth', next: 'cattleBirth' }
    ]
  },

  cattleFire: {
    id: 'cattleFire',
    phase: 'Cattle — fire',
    phaseClass: 'urgent',
    title: 'Cattle — burns and smoke inhalation',
    steps: [
      'Move cattle away from the fire zone to clean air and shade if safe to do so.',
      'Do not attempt to move severely burned cattle that cannot walk — call a vet immediately.',
      'Superficial singed hair with no skin damage: monitor, provide water and shade.',
      'Burned hooves or legs: the animal cannot be driven — requires on-site veterinary treatment.',
      'Smoke inhalation: symptoms appear hours later. Watch for laboured breathing, nasal discharge, and depression over 24–48 hours.',
      'Burned eyes: do not treat yourself — urgent vet attention required.',
      'Humane euthanasia by a vet may be the most welfare-appropriate outcome for severely burned animals — do not delay this decision.'
    ],
    info: { type: 'warning', body: 'Burns worsen over 48–72 hours as fluid loss and infection develop. Early vet assessment is critical even if the animal appears to be coping.' },
    choices: [
      { label: 'Find emergency vet contacts', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  cattleFlood: {
    id: 'cattleFlood',
    phase: 'Cattle — flood',
    phaseClass: 'urgent',
    title: 'Cattle — flood rescue',
    steps: [
      'Contact the SES (132 500) for large-scale livestock flood rescue — they coordinate boats and equipment.',
      'Do not attempt to swim or drive through floodwater to reach cattle.',
      'Cattle on high ground: if stable and not rising water — they can often survive for 48–72 hours. Prioritise getting feed and water to them.',
      'Cattle in water: exhausted cattle drown quickly. Call emergency services immediately.',
      'Post-flood: check for foot rot, grass tetany (if grazing sudden green flush), leptospirosis risk, and eye infections. Call a vet for assessment.',
      'Record losses and contact your state agriculture department for disaster assistance programs.'
    ],
    choices: [
      { label: 'Find emergency contacts', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  cattleHeat: {
    id: 'cattleHeat',
    phase: 'Cattle — heat stress',
    phaseClass: 'urgent',
    title: 'Cattle — heat stress',
    steps: [
      'Move to shade and provide cool water immediately — this is the single most important action.',
      'Signs of severe heat stress: open-mouth breathing, drooling, staggering, or collapse.',
      'Do not force a collapsed animal to stand — this worsens the condition.',
      'Spray with cool (not ice cold) water — wet the legs and underside, not just the back.',
      'Reduce stocking density and stop any mustering or movement during heat events.',
      'Cattle that have collapsed and are not responding to cooling within 30 minutes require urgent vet attention.',
      'High-risk animals: heavy condition, dark-coloured, recently transported, or heavily pregnant.'
    ],
    choices: [
      { label: 'Find emergency vet contacts', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  cattleDrought: {
    id: 'cattleDrought',
    phase: 'Cattle — drought',
    phaseClass: 'caution',
    title: 'Cattle — drought and starvation',
    steps: [
      'Assess body condition score (BCS) — cattle below BCS 1.5 (very emaciated) are at serious welfare risk.',
      'Recumbent animals (down and unable to rise): call a vet before offering feed or water — refeeding syndrome can be fatal.',
      'Dehydration is usually more urgent than hunger — ensure clean water before feed.',
      'Introduce feed gradually — sudden access to high-energy feed causes grain poisoning and acidosis.',
      'Humane euthanasia is the appropriate action for animals that cannot recover — contact your vet.',
      'Contact your state agriculture department for drought assistance, emergency hay, and financial support programs.'
    ],
    choices: [
      { label: 'Find emergency contacts', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  cattleInjury: {
    id: 'cattleInjury',
    phase: 'Cattle — injury',
    phaseClass: 'caution',
    title: 'Cattle — wound, fracture, or entanglement',
    steps: [
      'Safely restrain the animal in a crush or yard before attempting any assessment.',
      'Do not approach an injured animal in a paddock alone — call assistance.',
      'Wounds: do not probe or clean deep wounds yourself. Call a vet — deep puncture wounds can cause serious infections including tetanus.',
      'Fractures: limb fractures in adult cattle are almost always non-survivable. Contact a vet for euthanasia assessment.',
      'Wire entanglement: approach calmly, cut wire rather than pulling. Deep wire wounds require vet assessment.',
      'Eye injuries: very common post-fire and post-flood. Do not attempt treatment — vet attention required promptly.'
    ],
    choices: [
      { label: 'Find a vet', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  cattleBirth: {
    id: 'cattleBirth',
    phase: 'Cattle — dystocia',
    phaseClass: 'urgent',
    title: 'Cattle — difficult birth (dystocia)',
    alert: { type: 'danger', body: 'Dystocia is a veterinary emergency. Delay significantly worsens outcomes for both cow and calf. Call a vet immediately if the cow has been in active labour for more than 2 hours without progress.' },
    steps: [
      'Call a vet or experienced livestock handler immediately.',
      'Safely restrain the cow in a crush or pen.',
      'If the calf\'s feet are visible and labour has stalled: do not pull without veterinary guidance — incorrect traction causes serious injury.',
      'If the cow is exhausted and recumbent: keep quiet and still until help arrives.',
      'Do not leave the cow unattended.'
    ],
    choices: [
      { label: 'Find an emergency vet', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  // ── LIVESTOCK — HORSE ───────────────────────────────────────────────────────
  livestockHorse: {
    id: 'livestockHorse',
    phase: 'Livestock — horse',
    phaseClass: 'caution',
    title: 'Horse / donkey — emergency response',
    alert: { type: 'warning', body: 'Horses in distress are extremely dangerous — they kick, bite, and strike unpredictably. Never stand directly behind or directly in front of a distressed horse.' },
    choices: [
      { label: 'Bushfire — burns or smoke inhalation', icon: 'ti-flame', color: 'red', next: 'horseFire' },
      { label: 'Flood — stranded or swept', icon: 'ti-droplet', color: 'blue', next: 'horseFlood' },
      { label: 'Heat stress', icon: 'ti-sun', color: 'amber', next: 'horseHeat' },
      { label: 'Colic (abdominal pain)', icon: 'ti-heartbeat', color: 'red', next: 'horseColic' },
      { label: 'Wound or fracture', icon: 'ti-bandage', color: 'amber', next: 'horseInjury' },
      { label: 'Cast (trapped / unable to rise)', icon: 'ti-alert-triangle', color: 'amber', next: 'horseCast' }
    ]
  },

  horseFire: {
    id: 'horseFire',
    phase: 'Horse — fire',
    phaseClass: 'urgent',
    title: 'Horse — burns and smoke inhalation',
    steps: [
      'Horses will often refuse to leave a burning stable — blindfold the horse with a wet cloth to lead it out.',
      'Move to clean air and shade. Provide water.',
      'Do not hose burns with cold water — use cool (not cold) water if cooling is needed.',
      'Burns to the face, airways, or eyes require immediate vet attention.',
      'Smoke inhalation symptoms may be delayed 12–24 hours — monitor closely for laboured breathing.',
      'Burned hooves and legs: these injuries are often career-ending and may require euthanasia — call a vet promptly.',
      'Do not apply any dressings or creams to burns without veterinary guidance.'
    ],
    choices: [
      { label: 'Find emergency vet contacts', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  horseFlood: {
    id: 'horseFlood',
    phase: 'Horse — flood',
    phaseClass: 'urgent',
    title: 'Horse — flood rescue',
    steps: [
      'Do not attempt to ride or lead a horse through deep or fast-moving floodwater.',
      'Horses can swim but tire rapidly — a horse in floodwater that cannot touch the bottom is at high drowning risk.',
      'Contact SES (132 500) and your state livestock emergency authority for large animal water rescue.',
      'If the horse is stranded on high ground: it may be safer to leave it temporarily with food and water than to attempt a dangerous rescue.',
      'Post-flood: check for rain scald, mud fever (pastern dermatitis), laminitis (from lush post-flood grass), and eye infections.',
      'Record losses and contact your state agriculture department for disaster assistance.'
    ],
    choices: [
      { label: 'Find emergency contacts', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  horseHeat: {
    id: 'horseHeat',
    phase: 'Horse — heat stress',
    phaseClass: 'urgent',
    title: 'Horse — heat stress',
    steps: [
      'Move to shade immediately. Remove rugs.',
      'Apply cool water to the large blood vessels: neck, inside of legs, and over the hindquarters.',
      'Scrape the water off — it warms quickly and acts as insulation if left on.',
      'Repeat cooling until the horse is no longer distressed and breathing has slowed.',
      'Offer cool (not ice cold) water to drink in small amounts.',
      'A horse with a rectal temperature above 41°C (106°F) is in danger — call a vet immediately.',
      'Do not exercise horses when the Temperature Humidity Index (THI) is above 72.'
    ],
    choices: [
      { label: 'Find emergency vet contacts', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  horseColic: {
    id: 'horseColic',
    phase: 'Horse — colic',
    phaseClass: 'urgent',
    title: 'Horse — colic (abdominal pain)',
    alert: { type: 'danger', heading: 'Call a vet immediately', body: 'Colic is the leading cause of death in horses. It can progress from mild to surgical emergency within hours. Do not wait to see if it resolves.' },
    steps: [
      'Call a vet immediately — describe the symptoms, heart rate if you can check it, and how long it has been going on.',
      'Remove feed but keep water available.',
      'Walk the horse gently if it is trying to roll violently — this reduces the risk of gut twisting. Do not walk to exhaustion.',
      'Do not administer pain relief without vet guidance — it can mask symptoms and delay diagnosis.',
      'Monitor heart rate: above 60 beats per minute indicates serious pain. Above 80 is critical.',
      'Keep the horse calm and warm while waiting for the vet.'
    ],
    choices: [
      { label: 'Find an emergency vet', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  horseInjury: {
    id: 'horseInjury',
    phase: 'Horse — injury',
    phaseClass: 'caution',
    title: 'Horse — wound or fracture',
    steps: [
      'Safely contain the horse before attempting assessment — a panicking injured horse is very dangerous.',
      'Leg wounds near joints: any wound near or over a joint is a veterinary emergency — joint infections can be fatal within 24–48 hours.',
      'Wounds: apply a clean pressure bandage if there is significant bleeding. Call a vet.',
      'Suspected fracture: keep the horse as still as possible. Do not attempt to move it. Call a vet urgently.',
      'Limb fractures in horses are complex — treatment outcomes depend on which bone, the horse\'s age, and available facilities. Your vet will advise on prognosis.',
      'Eye injuries: do not attempt to treat. Cover loosely and call a vet promptly.'
    ],
    choices: [
      { label: 'Find an emergency vet', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  horseCast: {
    id: 'horseCast',
    phase: 'Horse — cast',
    phaseClass: 'urgent',
    title: 'Horse — cast (trapped and unable to rise)',
    steps: [
      'A cast horse has rolled and is stuck against a wall, fence, or in a ditch and cannot get up.',
      'Approach carefully — the horse may thrash suddenly when you get close.',
      'If against a wall or fence: use a long rope looped around the legs to gently roll the horse away from the obstruction. Stand well back.',
      'Once the horse has room to rise, move away and give it space to get up on its own.',
      'Check for injuries once the horse is standing — casting can cause muscle damage, nerve injuries, and wounds.',
      'Call a vet if the horse cannot rise unaided after 15 minutes, or if injuries are apparent.'
    ],
    choices: [
      { label: 'Find a vet', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  // ── LIVESTOCK — SHEEP / GOAT ────────────────────────────────────────────────
  livestockSheep: {
    id: 'livestockSheep',
    phase: 'Livestock — sheep / goat',
    phaseClass: 'caution',
    title: 'Sheep / goat — emergency response',
    choices: [
      { label: 'Bushfire — burns or smoke', icon: 'ti-flame', color: 'red', next: 'sheepFire' },
      { label: 'Flood — stranded or drowned', icon: 'ti-droplet', color: 'blue', next: 'sheepFlood' },
      { label: 'Heat stress / flystrike', icon: 'ti-sun', color: 'amber', next: 'sheepHeat' },
      { label: 'Drought — emaciation', icon: 'ti-cloud-off', color: 'gray', next: 'cattleDrought' },
      { label: 'Cast sheep (unable to rise)', icon: 'ti-alert-triangle', color: 'amber', next: 'sheepCast' },
      { label: 'Birthing complication', icon: 'ti-baby-carriage', color: 'teal', next: 'sheepBirth' }
    ]
  },

  sheepFire: {
    id: 'sheepFire',
    phase: 'Sheep — fire',
    phaseClass: 'urgent',
    title: 'Sheep / goats — fire and burns',
    steps: [
      'Move away from fire zone to clean air and water.',
      'Sheep with burned wool: the wool protects against initial burns but retains heat — clip or wet wool in severe cases.',
      'Burned hooves: very painful and often lead to secondary infections. Vet assessment required.',
      'Eye injuries from smoke and embers are common — do not treat yourself. Call a vet.',
      'Severely burned animals in large numbers: contact your state agriculture emergency authority for triage guidance and euthanasia assistance.',
      'Do not delay humane euthanasia for animals that cannot recover — this is a welfare priority.'
    ],
    choices: [
      { label: 'Find emergency contacts', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  sheepFlood: {
    id: 'sheepFlood',
    phase: 'Sheep — flood',
    phaseClass: 'urgent',
    title: 'Sheep / goats — flood',
    steps: [
      'Sheep are poor swimmers and panic easily in water — flooding causes rapid fatalities.',
      'Contact SES (132 500) for large-scale livestock rescue coordination.',
      'Sheep with wet heavy fleece are at risk of drowning and hypothermia — move to dry ground and shelter.',
      'After flooding: watch for footrot, pneumonia, and liver fluke in the following weeks.',
      'Goats cope with water better than sheep but are still at risk in floods.',
      'Record losses and contact your state agriculture department for disaster assistance.'
    ],
    choices: [
      { label: 'Find emergency contacts', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  sheepHeat: {
    id: 'sheepHeat',
    phase: 'Sheep — heat / flystrike',
    phaseClass: 'urgent',
    title: 'Sheep — heat stress and flystrike',
    steps: [
      'Move to shade and provide water immediately.',
      'Wet sheep and goats with cool water, focusing on the head and neck.',
      'Reduce stocking density and do not muster during heat events.',
      'Flystrike: check sheep regularly in warm wet weather. Signs include biting at the tail, discolouration of the wool, and a strong odour.',
      'Flystrike treatment: clip the affected area, remove maggots, apply registered insecticide treatment. Severe cases require vet attention.',
      'Flystrike can kill a sheep within days — early detection is critical.'
    ],
    choices: [
      { label: 'Find emergency contacts', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  sheepCast: {
    id: 'sheepCast',
    phase: 'Sheep — cast',
    phaseClass: 'caution',
    title: 'Cast sheep — unable to rise',
    steps: [
      'A cast sheep has rolled onto its back and cannot right itself — this is common in heavily pregnant or heavily fleeced animals.',
      'A sheep cast for more than a few hours may die from bloat or organ compression.',
      'Roll the sheep gently onto its sternum (chest). Hold it upright for a minute before letting it stand.',
      'The sheep may be wobbly initially — support it briefly then release.',
      'Check for injuries and signs of bloat (distended left side). Call a vet if bloated.',
      'In hilly paddocks: check low-lying areas and fence lines regularly, especially in late pregnancy.'
    ],
    choices: [
      { label: 'Find a vet if needed', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  sheepBirth: {
    id: 'sheepBirth',
    phase: 'Sheep — dystocia',
    phaseClass: 'urgent',
    title: 'Sheep / goat — difficult birth',
    steps: [
      'Call a vet or experienced livestock handler if the ewe has been in active labour for more than 45 minutes without progress.',
      'Restrain the ewe safely.',
      'If the lamb\'s feet are visible but labour has stalled: do not pull without guidance — incorrect traction injures both animals.',
      'If the lamb is backwards (breech): this is urgent — call a vet.',
      'Post-birth: ensure the lamb receives colostrum within 2 hours of birth. A lamb that has not fed in 4 hours is at serious risk.'
    ],
    choices: [
      { label: 'Find an emergency vet', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  // ── LIVESTOCK — PIG ─────────────────────────────────────────────────────────
  livestockPig: {
    id: 'livestockPig',
    phase: 'Livestock — pig',
    phaseClass: 'caution',
    title: 'Pig — emergency response',
    alert: { type: 'warning', body: 'Pigs are highly heat-sensitive and do not sweat. They can die from heat stress very rapidly. Pigs also bite — approach with care.' },
    steps: [
      'Heat stress: wet with cool water immediately — focus on ears and skin folds. Move to shade.',
      'Pigs cannot sweat — they must have mud wallows, shade, and water at all times in hot weather.',
      'Fire: pigs are slow-moving and at high risk. Move to cool clean air and water urgently.',
      'Flood: pigs swim well but tire quickly. Move to higher dry ground.',
      'Injury: pigs have tough skin and high pain tolerance — injuries may be underestimated. Call a vet for any significant wounds.',
      'Sudden death or unusual illness: contact your state agriculture department — some pig diseases (e.g. African Swine Fever) are notifiable and require reporting.'
    ],
    choices: [
      { label: 'Find a vet or emergency contact', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  // ── LIVESTOCK — POULTRY ─────────────────────────────────────────────────────
  livestockPoultry: {
    id: 'livestockPoultry',
    phase: 'Livestock — poultry',
    phaseClass: 'caution',
    title: 'Poultry — emergency response',
    steps: [
      'Heat stress: provide shade and cool water immediately. Spray a cool mist if available. Birds panting with open beaks are in danger.',
      'Fire: move birds away from smoke — poultry have highly sensitive respiratory systems.',
      'Flood: move to dry elevated ground. Wet birds lose body temperature rapidly.',
      'Predator attack: move surviving birds to a secure enclosure. Check all birds for injuries — wounds from predators become infected quickly.',
      'Sudden deaths or unusual symptoms in multiple birds: contact your state agriculture department — poultry diseases such as Avian Influenza are notifiable.',
      'Do not move sick or dead poultry off your property without advice from your vet or agriculture department — biosecurity is critical.'
    ],
    info: { type: 'warning', body: 'If multiple birds are dying unexpectedly, call the Emergency Animal Disease Watch Hotline: 1800 675 888 before doing anything else.' },
    choices: [
      { label: 'Find a vet or emergency contact', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  // ── DOMESTIC ANIMAL ─────────────────────────────────────────────────────────
  domesticAnimal: {
    id: 'domesticAnimal',
    phase: 'Domestic animal',
    phaseClass: 'ok',
    title: 'Domestic animal — dog, cat, or pet',
    choices: [
      { label: 'Injured or unwell', icon: 'ti-bandage', color: 'amber', next: 'domesticInjured' },
      { label: 'Lost or found stray', icon: 'ti-map-pin', color: 'blue', next: 'domesticLost' },
      { label: 'Emergency — fire, flood, or heatwave', icon: 'ti-alert-triangle', color: 'red', next: 'domesticEmergency' }
    ]
  },

  domesticInjured: {
    id: 'domesticInjured',
    phase: 'Domestic — injured',
    phaseClass: 'caution',
    title: 'Injured or unwell domestic animal',
    steps: [
      'Take to the nearest vet immediately for any serious injury. Vets are obligated to provide emergency triage.',
      'If the animal is in pain: it may bite even if it has never done so before. Use a muzzle or wrap in a towel if handling.',
      'Control bleeding with direct pressure using a clean cloth.',
      'Do not give human medications — paracetamol, ibuprofen, and many others are toxic to dogs and cats.',
      'Call the RSPCA (1300 278 000) if you found the animal and cannot reach a vet.'
    ],
    choices: [
      { label: 'Find a vet or contact', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  domesticLost: {
    id: 'domesticLost',
    phase: 'Domestic — lost',
    phaseClass: 'ok',
    title: 'Lost or stray domestic animal',
    steps: [
      'Take to any vet or council pound to scan for a microchip — free of charge.',
      'Report to your local council ranger service.',
      'Check for ear tags or brands on livestock — contact local police to identify the owner.',
      'Post on local community Facebook groups and apps like PawBoost or Pet Rescue.',
      'If during a disaster (fire, flood): contact your state disaster animal welfare authority — owners may be evacuated.'
    ],
    choices: [
      { label: 'Find local contacts', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  domesticEmergency: {
    id: 'domesticEmergency',
    phase: 'Domestic — emergency',
    phaseClass: 'urgent',
    title: 'Domestic animal — fire, flood, or heatwave',
    steps: [
      'Never leave pets behind in an evacuation if it is safe to take them. Animals left behind suffer and often do not survive.',
      'Prepare an animal emergency kit: food, water, medications, carrier, and ID records.',
      'Fire: wet a blanket and use it to cover a cat or small dog for short distances through smoke.',
      'Heat: never leave animals in a parked vehicle — temperatures reach lethal levels within minutes.',
      'Heat stress in dogs: cool water on the paws and groin, move to shade, offer water. Get to a vet urgently if unresponsive.',
      'Flood: keep pets on leads during evacuation — flooded areas disorient animals and they may bolt.',
      'Contact the RSPCA or your local council for animal evacuation assistance during declared disasters.'
    ],
    choices: [
      { label: 'Find emergency contacts', icon: 'ti-phone', color: 'green', next: 'contacts' }
    ]
  },

  // ── FERAL / INTRODUCED ──────────────────────────────────────────────────────
  feralAnimal: {
    id: 'feralAnimal',
    phase: 'Feral / introduced',
    phaseClass: 'gray',
    title: 'Feral or introduced animal',
    subtitle: 'Introduced species (foxes, rabbits, feral cats, deer, feral pigs, goats) are generally not covered by wildlife rescue organisations.',
    choices: [
      { label: 'Injured — appears to be suffering', icon: 'ti-heart', color: 'amber', next: 'introducedInjured' },
      { label: 'Causing damage to property, stock, or crops', icon: 'ti-alert-triangle', color: 'gray', next: 'introducedNuisance' }
    ]
  },

  introducedInjured: {
    id: 'introducedInjured',
    phase: 'Introduced — injured',
    phaseClass: 'caution',
    title: 'Injured introduced animal',
    steps: [
      'Contact your local vet — most will assess any animal in distress regardless of species.',
      'Contact your local council — they manage feral and stray animals in many areas.',
      'RSPCA can assist with introduced species in some regions.',
      'Large feral animals on roads (deer, pigs): if causing a traffic hazard and cannot be moved, contact local police who can authorise humane dispatch.'
    ],
    choices: [
      { label: 'Find local contacts', icon: 'ti-arrow-right', color: 'green', next: 'contacts' }
    ]
  },

  introducedNuisance: {
    id: 'introducedNuisance',
    phase: 'Feral — damage',
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

  // ── CONTACTS ────────────────────────────────────────────────────────────────
  contacts: {
    id: 'contacts',
    phase: 'Local contacts',
    phaseClass: 'ok',
    title: 'Find local services'
  }
};

// ─── CONTACT DIRECTORY ───────────────────────────────────────────────────────
// Edit STATE_CONTACTS to add or update regional rescue groups.

const STATE_CONTACTS = {
  QLD: [
    { name: 'RSPCA Queensland', desc: 'Wildlife rescue and rehabilitation across QLD', phone: '1300 264 625', url: 'https://www.rspcaqld.org.au' },
    { name: 'Wildlife Queensland', desc: 'Conservation and rescue support across QLD', phone: null, url: 'https://www.wildlife.org.au' },
    { name: 'Australia Zoo Wildlife Hospital', desc: 'Sunshine Coast — major wildlife hospital', phone: '07 5436 2226', url: 'https://www.australiazoo.com.au/conservation/wildlife-hospital/' },
    { name: 'Queensland Rural and Industry Development Authority (QRIDA)', desc: 'Disaster assistance for primary producers', phone: '1800 623 946', url: 'https://www.qrida.qld.gov.au' },
    { name: 'DAF Animal Biosecurity', desc: 'Queensland agriculture emergency animal disease', phone: '13 25 23', url: 'https://www.daf.qld.gov.au' }
  ],
  NSW: [
    { name: 'WIRES', desc: 'Largest wildlife rescue organisation in NSW — 24/7', phone: '1300 094 737', url: 'https://www.wires.org.au' },
    { name: 'Sydney Wildlife', desc: 'Sydney metro and surrounds', phone: '9413 4300', url: 'https://www.sydneywildlife.org.au' },
    { name: 'Local Land Services NSW', desc: 'Livestock emergency and drought support', phone: '1300 795 299', url: 'https://www.lls.nsw.gov.au' },
    { name: 'ORRCA (whale and dolphin rescue)', desc: 'NSW marine mammal rescue', phone: '02 9415 3333', url: 'https://www.orrca.org.au' }
  ],
  VIC: [
    { name: 'Wildlife Victoria', desc: '24/7 state emergency response line', phone: '1300 094 535', url: 'https://www.wildlifevictoria.org.au' },
    { name: 'Agriculture Victoria — emergency', desc: 'Livestock emergency support', phone: '136 186', url: 'https://agriculture.vic.gov.au' },
    { name: 'Healesville Sanctuary Wildlife Hospital', desc: 'Eastern VIC major wildlife hospital', phone: '03 5957 2800', url: 'https://www.zoo.org.au/healesville' }
  ],
  SA: [
    { name: 'Fauna Rescue SA', desc: 'South Australia wildlife rescue network', phone: '08 8289 0896', url: 'https://www.faunarescue.org.au' },
    { name: 'Primary Industries and Regions SA (PIRSA)', desc: 'Livestock emergency and disease reporting', phone: '1800 675 888', url: 'https://www.pir.sa.gov.au' }
  ],
  WA: [
    { name: 'Wildcare Helpline (DBCA)', desc: 'WA state government wildlife helpline', phone: '08 9474 9055', url: 'https://www.dbca.wa.gov.au' },
    { name: 'Department of Primary Industries and Regional Development WA', desc: 'Livestock emergency support', phone: '08 9368 3333', url: 'https://www.agric.wa.gov.au' }
  ],
  NT: [
    { name: 'NT Parks and Wildlife', desc: 'Northern Territory government wildlife services', phone: '08 8999 4555', url: 'https://nt.gov.au/environment/animals/injured-animals' },
    { name: 'NT Department of Industry, Tourism and Trade', desc: 'Livestock emergency support', phone: '1800 084 881', url: 'https://industry.nt.gov.au' }
  ],
  TAS: [
    { name: 'Bonorong Wildlife Sanctuary', desc: 'TAS rescue and rehabilitation — 24/7', phone: '0447 264 625', url: 'https://www.bonorong.com.au' },
    { name: 'NRE Tasmania (livestock)', desc: 'TAS agriculture emergency support', phone: '03 6165 3777', url: 'https://nre.tas.gov.au' }
  ],
  ACT: [
    { name: 'ACT Wildlife', desc: 'ACT region wildlife rescue', phone: '0432 300 033', url: 'https://www.actwildlife.net' },
    { name: 'ACT Agriculture', desc: 'ACT livestock and animal welfare', phone: '13 22 81', url: 'https://www.act.gov.au' }
  ]
};

const NATIONAL_CONTACTS = [
  { name: 'Emergency — police / ambulance / fire', desc: 'If the scene is dangerous or a person has been injured', phone: '000', url: null, urgent: true },
  { name: 'SES — flood and storm rescue', desc: 'State Emergency Service — large animal flood rescue coordination', phone: '132 500', url: 'https://www.ses.nsw.gov.au', urgent: true },
  { name: 'Emergency Animal Disease Watch Hotline', desc: 'For unusual livestock illness or mass deaths — operates 24/7', phone: '1800 675 888', url: null, urgent: true },
  { name: 'WIRES Wildlife Rescue (24/7 national)', desc: 'Will redirect to your nearest local wildlife group', phone: '1300 094 737', url: 'https://www.wires.org.au' },
  { name: 'Wildlife Victoria (24/7)', desc: 'VIC emergency line — also assists with referrals nationally', phone: '1300 094 535', url: 'https://www.wildlifevictoria.org.au' },
  { name: 'RSPCA Australia', desc: 'Cruelty reporting and rescue services nationally', phone: '1300 278 000', url: 'https://www.rspca.org.au' },
  { name: 'WIRES rescuer finder tool', desc: 'Online directory — find the closest wildlife rescue group by postcode', phone: null, url: 'https://www.wires.org.au/wildlife-info/rescue-wildlife' }
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
