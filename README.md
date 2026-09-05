# MDO Autos — VTF inspection site

Static marketing site for MDO Autos, an independent vehicle test-fit (VTF)
inspection lab. Plain HTML, CSS, and one small JS file. No build step, no
dependencies, no backend — it deploys to GitHub Pages exactly as committed.

## Before launch

Everything below is a placeholder in the committed source. Placeholders render
in a red dashed box on the page so an unfilled one is hard to ship by accident.

### 1. Contact details — `contact.html`

Replace these, all in the `.contact-list` block:

| Placeholder | Notes |
| --- | --- |
| `[PHONE NUMBER]` | |
| `[EMAIL ADDRESS]` | Consider wrapping in a `mailto:` link once real |
| `[STREET ADDRESS]` | |
| `[CITY, STATE, POSTAL CODE]` | |
| `[BUSINESS HOURS]` | |

### 2. Form endpoint — `contact.html`

The inquiry form has no backend. GitHub Pages serves static files only, so the
form POSTs to a third-party handler.

1. Create a form at [formspree.io](https://formspree.io) and point it at the
   address that should receive inquiries.
2. Replace the placeholder `action` on the `<form>`:

   ```html
   <!-- current -->
   <form action="https://formspree.io/f/[FORMSPREE_FORM_ID]" method="POST">
   <!-- becomes -->
   <form action="https://formspree.io/f/mabcdefg" method="POST">
   ```

3. Delete the visible `.note` "Pre-launch" block directly above the form.
4. Submit the form once from the live domain — Formspree requires confirming
   the first submission before it starts forwarding.

The form already includes a `_subject` hidden field and a `_gotcha` honeypot,
both Formspree conventions. They are harmless if you switch to another handler,
but check that handler's own spam-field naming.

### 3. Accreditation copy — `facility.html`, section 04

Four placeholders: `[ACCREDITING BODY AND SCOPE]`,
`[TECHNICIAN CERTIFICATIONS HELD]`,
`[MEASUREMENT EQUIPMENT CALIBRATION STANDARD AND INTERVAL]`,
`[INDUSTRY MEMBERSHIPS AND AFFILIATIONS]`.

**Delete the whole section if there is nothing real to put in it.** An empty
credentials section is better than an overstated one on a site selling
independent inspection.

### 4. Turnaround time — `facility.html`, section 03

`[TURNAROUND TIME]` — target time from part receipt to delivered report.

## Adding photography

The strongest asset this site can have is your own inspection photography —
gap/flush shots, candidate-vs-OEM side-by-sides, bracket engagement. You
already produce these as report deliverables. Stock imagery would actively
undercut a site selling independent evidence, so none is used.

A `.photo` component is already styled and ready. To use it:

1. Put images in `assets/img/` (JPG, roughly 1600px wide, compressed).
2. Drop the markup wherever it belongs:

   ```html
   <figure class="photo">
     <img src="assets/img/gap-taper-candidate.jpg"
          alt="Candidate bumper cover showing gap widening toward the lower edge"
          width="1600" height="1067" loading="lazy">
     <figcaption>Candidate part, lower edge. Gap opens 2.8 mm.</figcaption>
   </figure>
   ```

3. Use `.photo-grid` to place two side by side.

Always set `width`/`height` (prevents layout shift) and write a real `alt`
describing the defect, not "photo of car". Replacing the hero SVG in
`index.html` with a `.photo` figure is the single highest-impact change
available once you have a usable shot.

## Deployment

Everything is at the repository root, so GitHub Pages needs no configuration
beyond selecting the branch.

- `CNAME` — contains `mdoautos.com`. GitHub Pages reads this to bind the custom
  domain. DNS still has to be pointed separately at your registrar.
- `.nojekyll` — stops Pages running the files through Jekyll. Not strictly
  required today, but it prevents Jekyll from silently ignoring any file or
  directory beginning with an underscore later on.

Pages settings and DNS are handled manually and deliberately not scripted here.

## Local preview

No build step. Open `index.html` directly, or serve the directory so that
root-relative paths behave as they will in production:

```
python -m http.server 8000
```

## Structure

```
index.html          Home — hero, four inspection types, four-step process, CTA
services.html       Full description of each inspection type (#anchored)
facility.html       Measurement set, vehicle sourcing, reporting, credentials
contact.html        Contact details and inquiry form
assets/css/styles.css
assets/js/nav.js    Mobile nav toggle only
CNAME               Custom domain for GitHub Pages
.nojekyll           Disable Jekyll processing
```

Header and footer markup is duplicated across the four pages — the cost of
having no build step. Editing nav or footer links means editing all four files.

## Design notes

Palette and type are deliberate and documented here so future edits stay
consistent:

- **Ground** `#ECEEF0` drafting paper, **ink** `#16191C` graphite,
  **accent** `#17408B` Dykem layout blue (the dye machinists paint on stock
  before scribing), **redline** `#B32418`.
- **Redline is reserved for measurement annotation and unfilled placeholders.**
  It is never a button or a link colour. Keeping it scarce is what makes it
  read as engineering markup instead of decoration.
- **IBM Plex Sans** for prose, **IBM Plex Mono** for anything that is data —
  step numbers, spec labels, table headers, figure callouts.
- Square corners, hairline rules, no drop shadows. Structure comes from rules
  and whitespace, not from floating cards.
