# CTRL–P

**A time-governed printing protocol operating at street level.**

CTRL–P is not a publishing platform. It is a protocol — a set of fixed rules that govern the production, placement, and replacement of screen-printed panels in public space. The system is deterministic and non-reactive. It does not respond to audience, context, or interpretation. It persists through structured repetition.

---

## The Clock

All activity in CTRL–P is anchored to a single fixed UTC epoch:

```
2026-03-03T00:00:00Z
```

From this moment, a 30-day clock began running. It has not stopped. It will not stop. Every node on the network references the same clock. Every cycle begins and ends at the same moment across the entire network, regardless of geography or content.

The clock has five states, marked by moon-phase symbols at six-day intervals. A single hand completes one full rotation every 30 days. There are no hours. There are no minutes. There is only position within the cycle.

---

## System Components

### Nodes

A node is a physical installation — a group with access to a wall and the means to screen print. Each node is responsible for its own production. Nodes do not coordinate content. The protocol is the only shared language.

Nodes are identified by a code:

```
N[country code]-[sequence number]
e.g. NIT-001  NFR-002  NGB-003
```

Active nodes replace one panel every six days. Five panels complete one cycle. A node that misses its upload window forfeits that cycle. The missed slot is recorded as black. There is no correction, no catch-up, no exception.

### Cycles

A cycle is 30 days of elapsed time. Cycles are numbered sequentially from the epoch and are identical in duration for all nodes. Each cycle consists of five panels, each displayed for six days before replacement.

Cycle numbering is absolute and permanent:

```
Cycle 01  —  03 Mar 2026 → 01 Apr 2026
Cycle 02  —  02 Apr 2026 → 01 May 2026
Cycle 03  —  02 May 2026 → 31 May 2026
...
```

New nodes joining in a later cycle begin at that cycle number. They do not backfill.

### Feed

Each node maintains a continuous image feed — one photograph per hour from the installation site. The feed is the ledger. It records what was on the wall, when, and for how long. The feed is navigated by day within the current cycle. Previous cycles are archived below the current feed in chronological order.

The feed does not editorialize. It documents.

### Interface

The interface renders the state of the network without influencing it. It shows the clock, the nodes, the cycles, and the feed. It provides an admin layer for node operators to upload panels within the permitted window. It makes the network visible.

The interface does not have a feed of its own. It is not a social layer. It has no comments, no reactions, no followers.

---

## Upload Protocol

Node administrators may upload the five panels for the next cycle during a defined window:

- **Window opens:** Day 25 of the current cycle
- **Window closes:** End of Day 30 (cycle rollover)
- **Panels required:** 5 images, each 70 × 100 cm format (7:10 ratio)
- **Missed window:** Single black panel recorded. No retroactive upload.

The upload window of six days mirrors the display duration of a single panel. It is not arbitrary.

---

## Admin Access

Admin access is per-node. Each node has a unique ID and password. Login is accessed via a concealed gesture within the interface — deliberately undocumented here.

Admin capabilities:

- Upload the five panels for the next cycle (within the upload window)
- Toggle node active/inactive status
- Register new nodes (network admin only)

---

## Repository Structure

```
index.html        — complete single-file application
README.md         — this document
```

The application is intentionally contained in a single HTML file. It requires no build process, no framework, no local server. Open it in a browser. It works.

External dependencies loaded at runtime:

- [TopoJSON Client](https://github.com/topojson/topojson-client) — Europe map rendering
- [world-atlas](https://github.com/topojson/world-atlas) — geographic data
- [Google Fonts](https://fonts.google.com) — Courier Prime, Special Elite

---

## Deployment

The interface is hosted as a static site via GitHub Pages. No server-side logic is required for the current prototype. A backend (Supabase) will be integrated when real nodes begin uploading images.

Live: [ctrl-p.art](https://ctrl-p.art)

---

## Joining the Network

A node requires:

- A wall. Accessible, visible, in public or semi-public space.
- The means to screen print at 70 × 100 cm.
- Commitment to the 30-day cycle.
- A camera, fixed to the installation site, capable of automated hourly capture.

The protocol does not require artistic training, institutional affiliation, or permission beyond access to the wall. If the panels remain, permission is assumed. Silence is sufficient.

To register interest in becoming a node, contact the network through the interface.

---

## The Protocol

The streets are saturated with messages. Publicity. Branding. Notices. These walls already exist. We do not compete with them.

Five panels. 70 × 100 cm. Screen printed. Installed in plain view. One panel changes every six days. Every panel is replaced, never edited.

Printing is repetition. Repetition establishes presence. The panels form the printed pulse. The objective is continuity.

The unit of performance is time. The five-panel set is a slow-motion single slide, revealed as one cycle transitions into the next. If the panels remain, permission is assumed. Silence is sufficient.

The process endures. The rhythm is the constant. Thirty days pass, and a new cycle begins. The protocol persists in the act of replacement.

---

*ctrl-p.art — open protocol — open source*
