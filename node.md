# NODE 

A node is a physical installation synchronised to the CTRL–P clock. It operates at street level and follows the clock without modification.

Nodes do not calculate time independently. Nodes subscribe to the public clock.

A node exists only while it maintains synchronisation.

---

## Definition

A node consists of:

- Five physical panels (70 × 100 cm)
- A fixed installation surface (wall)
- A camera capturing one image of the installation per hour
- A connection to the CTRL–P clock
- A screen printing setup to produce the panels

---

## The clock

All node behaviour is governed by the CTRL–P clock.

```
Epoch:          2026-03-03T00:00:00Z
State duration: 144 hours (6 days)
States per cycle: 5
Cycle length:   720 hours (30 days)
```

Time is determined strictly by UTC. Nodes must:

- Read the current clock state
- Detect state transitions
- Replace exactly one panel per transition
- Replace sequentially: P1 → P2 → P3 → P4 → P5 → P1
- Never edit an existing panel
- Never batch-replace
- Never skip a state

Nodes must not:

- Adjust the epoch
- Modify state duration
- Apply local time corrections
- Pause the cycle

The clock governs. The node follows.

---

## Replacement logic

On each state transition (every 144 hours):

1. Remove the current panel from the wall
2. Install the next panel in sequence
3. Record the UTC timestamp
4. Continue operation

After five transitions (720 hours / 30 days), one full cycle completes. The sequence repeats indefinitely.

The panels are indexed 0–4, corresponding to clock states 0–4. P01 is installed at state 0, P02 at state 1, and so on. The first panel of each new cycle is P01.

If a transition is missed, the interface records a black panel for that state. There is no retroactive replacement, no correction, no editing of the historical record. The absence is the record.

---

## Equipment

**xTool screen printer**
The printing unit. Four frames are included. Mesh screens engraved by a hub. Printer transfers ink onto paper in a single-colour pass per screen.

**Screen kit**
12 screens, one per motif in the ctrl-p archive, engraved by a hub and shipped to the node. Each screen is labelled with its motif code (e.g. `SLASH`, `CIRCLE`, `DIAG`). A full kit gives access to all 12 motifs in normal and inverted orientation — inverted orientation is achieved by rotating the screen 180° manually on the frame before printing.

Screens are durable for 100+ prints. Replacements are ordered from any hub when needed.

**Frames (4)**
Included with the xTool screen printer. Screens are swapped in and out of frames between passes.

**Paper**
70 × 100 cm sheets. The format is fixed by the protocol. Paper weight and finish are the node's choice.

**Ink**
The protocol places no constraints on ink. Colour is entirely the node's decision, chosen fresh for each cycle. The same motif printed in ochre by one node and in deep navy by another are equally valid expressions of the protocol. The Feed records what was actually printed — colour, composition, condition — and that record is permanent.

---

## Cycle workflow

The upload window opens on day 25 of the current cycle and closes at the end of day 30. The interface shows how many days remain. Uploading early is strongly encouraged — it allows time to prepare screens, mix inks, and print before the first transition day.

**1. Design**

The node admin logs into the interface and navigates to the **create** page. Using the poster creator, they design five posters for the upcoming cycle — selecting a motif, ink colour reference, and orientation (normal or inverted) for each of the four quadrants on each poster.

Each quadrant represents one screen pass at 30 × 40 cm. The four quadrants are separated by a 1 cm gap and centred on the 70 × 100 cm sheet with 4.5 cm left/right borders and 9.5 cm top/bottom borders.

**2. Export**

Each poster is exported as an SVG file. The filename is assigned automatically:

```
NIT-001-C01-P01.svg  →  installed at state 0
NIT-001-C01-P02.svg  →  installed at state 1
NIT-001-C01-P03.svg  →  installed at state 2
NIT-001-C01-P04.svg  →  installed at state 3
NIT-001-C01-P05.svg  →  installed at state 4
```

Each SVG contains a `<metadata>` block — the print manifest:

```xml
<ctrl-p>
  <node>NIT-001</node>
  <city>Bosa</city>
  <cycle>01</cycle>
  <poster>1 of 5</poster>
  <timestamp>C01D06H14-832</timestamp>
  <quad id="I"   screen="SLASH-N"  ink="#1c3a2a" inverted="false"/>
  <quad id="II"  screen="CIRCLE-I" ink="#8b0000" inverted="true"/>
  <quad id="III" screen="DIAG-N"   ink="#111111" inverted="false"/>
  <quad id="IV"  screen="RINGS-N"  ink="#1c2d4a" inverted="false"/>
</ctrl-p>
```

The manifest is the complete print instruction for that poster. Screen codes map directly to the labelled screens in the node's kit.

**3. Add to the cycle**

The five SVG files are uploaded to the cycle in the interface. They appear in P01→P05 order — the same sequence they will be installed. The digital compositions become the public-facing record of the cycle. They represent design intent. The Feed captures physical reality. Both are part of the permanent record.

**4. Print**

Working from the print manifest:

- Pull the four screens specified per poster
- Mount each in a frame
- Position paper on the printing surface
- Print one quadrant per pass — four passes per poster
- For screens marked inverted, rotate 180° on the frame before printing
- Repeat for all five posters

Five posters. Four inks per poster. Twenty screen passes per cycle.

**5. Install**

Install P01 at the start of the new cycle. Replace with P02 exactly 144 hours later, P03 after a further 144 hours, and so on through P05. Replacement is triggered by the clock transition, not by condition of the existing panel.

---

## Feed contribution

Each node contributes to the public Feed.

Requirements:

- Capture one image per hour (UTC)
- Stamp each image with: UTC timestamp, clock state index (0–4), node ID
- Append images sequentially to the Feed archive

If an image is not captured, insert a black frame stamped with UTC timestamp and state index.

Absence does not interrupt the chain. The Feed functions as a continuous visual ledger from genesis to present.

---

## Node identity

Each node has a unique ID in the format `NXX-NNN`:

- `N` — node
- `XX` — ISO country code
- `NNN` — sequential number within the network

Examples: `NIT-001` (Bosa), `NFR-002` (Paris), `NDE-004` (Berlin).

The ID is permanent. A node that goes inactive retains its ID and its complete historical record in the interface and the Feed archive. It is no longer active but it is not erased.

---

## Integrity conditions

A node is considered **active** if it:

- Remains synchronised to the clock
- Performs replacement on each state transition
- Contributes hourly images without breaking sequence

A node that stops updating is no longer active. It remains in the archive.

---

## Registration

Each node registers once with:

```json
{
  "node_id": "NIT-001",
  "city": "Bosa",
  "country": "IT",
  "location_description": "...",
  "installation_date": "UTC timestamp",
  "panel_format": "5 × 70×100cm",
  "camera_access": true
}
```

Registration is submitted via GitHub Issues. Operation establishes legitimacy.

---

## Governance

Version 1 nodes operate under:

- Immutable epoch (`2026-03-03T00:00:00Z`)
- Immutable state duration (144 hours)
- Deterministic time calculation from UTC
- No geographic adjustment
- No local correction

Future versions, if defined, must not modify v1 behaviour.

---

## What the protocol does not specify

The protocol defines format, clock, replacement logic, and Feed contribution. Everything else is the node's decision:

- Ink colour — entirely free
- Wall surface — any publicly visible location
- Paper stock — weight and finish at the node's discretion
- Community engagement — optional
- Whether to retain or discard replaced panels

---

## Principle

A node does not interpret the protocol.
A node executes the protocol.

Time is the structure.
Replacement is the act.
Continuity is the proof.
