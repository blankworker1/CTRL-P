# FEED


---

## CTRL–P Feed Specification (v1)

The Feed is the continuous visual ledger of all active Nodes.

It records the operation of the protocol in hourly increments.

The Feed does not interpret events.

It documents them.


---

## Definition

The Feed is a sequential archive of images captured by Nodes.

Each image represents:

One Node

One UTC hour

One clock state


The Feed begins at a Node’s installation date and continues indefinitely.

There is no deletion.

There is no retroactive editing.


---

## Capture Requirements

Each active Node must:

Capture one image per hour (UTC aligned)

Submit images in chronological order

Maintain uninterrupted sequence


Each image must include metadata:

utc_timestamp

clock_state (0–4)

node_id


Images are appended to the archive in strict time order.


---

## Absence Handling

If an image is not captured or transmitted:

A black frame is inserted

The frame is stamped with UTC timestamp and state index

The sequence continues


Absence does not pause the protocol.

The gap becomes visible in the ledger.


---

## Immutability

Once appended:

Images are not modified

Images are not replaced

Timestamps are not altered


The Feed operates as a temporal chain from genesis to present.

Continuity is preserved even when content changes.


---

## Structure

For each Node:

Genesis → Hour 1 → Hour 2 → … → Present

Across Nodes:

All entries are sortable by:

UTC time

Clock state

Node ID


The Feed may be viewed:

As a vertical chronological list of Cycles

As a horizontal set of Panels 

As a downloadable time-lapse photo sequence


Presentation may vary.

Sequence does not.


---

## Relationship to the Clock

The Feed does not calculate time.

It references the CTRL–P Slow Base-5 Clock (v1).

Each image corresponds to:

A precise moment in UTC

A defined clock state

A position within a 30-day Cycle


The Clock defines the structure.

The Feed reveals adherence.


---

## Integrity Conditions

The Feed is considered valid if:

Hourly intervals remain sequential

Timestamps are UTC aligned

No entries are removed

Inserted black frames preserve continuity


Breaks in capture are visible.

Breaks do not invalidate the image chain.


---

## Principle

The Feed is not commentary. It is not curation. It is not narrative.

It is accumulated time made visible.

The Clock governs.

The Node performs.

The Feed records.

The Cycle repeats.

Continuity is the proof.

