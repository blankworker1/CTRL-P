# ctrl-p.art — hub

A hub is a screen engraving service. It holds the equipment needed to burn designs onto mesh screens from the canonical archive, and ships those screens to nodes anywhere in the world.

Any operator can run a hub. There is no central authority. The only requirement is access to the right equipment and the GitHub archive.

---

## What a hub does

A hub receives screen orders from nodes and engraves them on demand from the SVG files stored in the `/screens` folder of the ctrl-p.art GitHub repository. It does not design screens, review poster content, or have any involvement in what nodes print. Its role is purely mechanical: receive order, engrave screen, ship screen.

When a new node joins the network, its first order is typically a full kit of 12 screens — one per motif in the archive. When a screen wears out after extended use (typically 100+ prints), the node orders a replacement of that screen only.

---

## Equipment

**xTool laser engraver**
The laser burns the motif design directly into the screen mesh, replacing the traditional emulsion-and-darkroom process. Engraving a single screen takes 1–3 hours depending on design complexity. The laser reads the SVG file directly from xTool software — no conversion or resizing is needed as the archive files are sized to the xTool print area (300 × 400 mm).

**Mesh stock**
Raw screen mesh, cut and stretched onto frames before engraving. The hub keeps mesh stock on hand to fulfil orders. It does not store pre-engraved master screens — every screen is engraved fresh from the archive file when ordered. The archive is the master; the engraved screen is a copy.

**Computer with archive access**
The hub operator loads the relevant SVG file from the GitHub repository directly into xTool software for each engraving job. No local copy of the archive is required — the canonical source is always GitHub.

---

## The screen archive

The archive lives at `github.com/blankworker1/CTRL-P/screens`. It currently contains 12 SVG files, one per motif:

```
SLASH.svg    LINES.svg    CIRCLE.svg    RINGS.svg
GRID.svg     DIAG.svg     CROSS.svg     TRI.svg
DOTS.svg     BLOCKS.svg   WAVE.svg      X.svg
```

Each file is a production-ready vector at 300 × 400 mm with a transparent background and a pure black motif — exactly what the laser needs. There is no halftone. No grey values. Sharp edges only.

Screens are identified by motif name and orientation:

- `SLASH-N` — normal orientation
- `SLASH-I` — inverted (screen rotated 180° manually by the printer)

A complete node kit is 12 screens. The hub engraves whichever screens are ordered — a full kit for a new node, or a single replacement for an existing one.

---

## Screen identity

Each physical screen is labelled by the hub before shipping using the motif name and orientation code. Node operators store screens by this code in their local kit. When a print manifest specifies `CIRCLE-I`, the operator pulls the CIRCLE screen and rotates it 180° before printing. Labels are permanent — adhesive or engraved on the frame.

---

## Ordering screens

Nodes order screens directly from a hub of their choice. Because the archive is public and identical worldwide, any hub produces the same screen from the same file. A node is not tied to the hub that supplied their original kit — they can reorder from any hub at any time.

In future, hubs will supply complete node printing kits and extra frames via an online shop. This is not yet active.

---

## Adding new motifs

The archive grows in blocks of 12. New motifs can be submitted by anyone via GitHub Issues at:

`github.com/blankworker1/CTRL-P/issues`

Submissions can be a text prompt describing the desired motif, or any image file as reference. The hub interprets the submission, uses AI tools to generate the final SVG, reviews it for consistency with the archive aesthetic (transparent background, pure black, no halftone, sharp vector), and opens a pull request. Once merged, the motif becomes part of the canonical archive and any hub worldwide can engrave it.

The submitting contributor is credited in the commit.

---

## Replicating a hub

Setting up a hub requires:

1. An xTool laser engraver
2. Mesh stock and frames
3. Access to GitHub and the `/screens` archive
4. A way to receive orders and ship screens

There is no registration process, no licence, and no fee. A hub is simply an operator with the equipment and the willingness to provide the service. The network is designed so that no single hub is a dependency — if one hub goes offline, nodes order from another.

The first hub is located in Bosa, Sardinia. It currently services the Bosa node only. Hub services to other nodes will open when the network expands.

---

## What a hub is not responsible for

A hub has no knowledge of or interest in:

- What ink a node uses
- What the finished posters look like
- Where posters are installed
- What cycle a node is on
- Any content decisions made by nodes

The hub's role ends when the screen leaves. What the node does with it is entirely the node's affair.
