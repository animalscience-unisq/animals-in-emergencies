# Wildlife emergency guide — Australia

A decision-tree web app for emergency response to injured and endangered native wildlife in rural and regional Australia. Designed for both members of the public and wildlife workers, rangers, and vets.

## What it does

- Prioritises human safety at every step before animal approach
- Walks through scene safety, animal identification, animal condition assessment, and first-response actions
- Covers: macropods, bats (ABLV warning), snakes, lizards, birds (including raptors), marine animals, introduced/feral species, and orphaned joeys
- Postcode-based contact lookup returns state-specific rescue organisations
- Always shows national contacts (WIRES 24/7, Wildlife Victoria, RSPCA)
- Works offline once loaded (no API calls required)
- Fully responsive — works on mobile in the field

## File structure

```
wildlife-guide/
├── index.html          # Entry point
├── css/
│   └── style.css       # All styles — light/dark mode, responsive
├── js/
│   └── app.js          # Screen renderer and navigation logic
└── data/
    └── tree.js         # All decision tree content, contacts, and postcode mapping
```

## How to run locally

No build step required. Just open `index.html` in a browser — or serve with any static server:

```bash
# Python 3
python3 -m http.server 8080

# Node (npx)
npx serve .
```

Then open `http://localhost:8080`.

## How to deploy

Works on any static hosting:

- **GitHub Pages**: push to a repo, enable Pages from Settings → Pages → main branch / root
- **Netlify**: drag the folder into netlify.com/drop
- **Vercel**: `vercel --prod` from the directory

## How to update content

All decision tree content and contacts live in `data/tree.js` — no JS logic knowledge needed to edit it.

### Add or update a rescue contact

In `STATE_CONTACTS`, find the relevant state and add/edit an entry:

```js
QLD: [
  { name: 'Organisation name', desc: 'Short description', phone: '1300 000 000', url: 'https://example.org' },
  ...
]
```

Set `phone: null` or `url: null` if not applicable.

### Add a new decision step

Add a new node to the `TREE` object. Minimum structure:

```js
myNewScreen: {
  id: 'myNewScreen',
  phase: 'Phase label',         // shown in badge
  phaseClass: 'caution',        // urgent | caution | ok | gray
  title: 'Screen heading',
  subtitle: 'Optional description',
  steps: [                      // optional numbered steps
    'Step one text.',
    'Step two text.',
    '[PROFESSIONAL] Only shown to professional users.'
  ],
  alert: {                      // optional alert box
    type: 'danger',             // danger | warning | info | success
    heading: 'Optional heading',
    body: 'Alert body text.'
  },
  choices: [                    // navigation buttons
    { label: 'Button label', sub: 'Optional sublabel', icon: 'ti-arrow-right', color: 'green', next: 'targetScreenId' }
  ]
}
```

Then add it to the `PROGRESS` map in `js/app.js`:

```js
const PROGRESS = {
  ...
  myNewScreen: 55,   // 0–100, used for the progress bar
};
```

### Professional-only content

Any step starting with `[PROFESSIONAL]` is hidden for members of the public and shown (with the prefix stripped) for professional users.

## Known limitations and suggested next steps

- Contact data is a static directory — phone numbers can change. Consider a periodic review cycle or community contribution process.
- Postcode → state mapping uses numeric ranges, which are accurate for most cases but some cross-border postcodes may be misclassified. A full postcode CSV lookup would eliminate this.
- No offline caching (PWA). For field use with poor signal, adding a service worker would cache the app after first load.
- GPS auto-detection could replace manual postcode entry on mobile.
- Some species groups are coarse (e.g. "other native mammal" covers wombats, echidnas, possums, and koalas — each has meaningfully different handling requirements). Future versions could branch these further.

## Disclaimer

This tool provides general first-response guidance only. It does not replace veterinary advice or professional wildlife training. Contact information is provided in good faith and may change — verify before relying on it in an emergency.

## Licence

MIT — free to use, adapt, and redistribute.
