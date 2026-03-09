# NODE


---

## CTRL–P Node Specification (v1)

A Node is a physical installation synchronized to the CTRL–P Slow Base-5 Clock.

It operates at street level and follows the clock without modification.

Nodes do not calculate time independently.

Nodes subscribe to the public clock.


---

## Definition

A Node consists of:

- Five physical panels (70 × 100 cm)

- A fixed installation surface (wall)

- A camera capturing one image of the installation per hour 

- A connection to the CTRL–P Base-5 Clock (v1)

A Node exists only while it maintains synchronization.


---

## Time Subscription

Nodes subscribe to:

CTRL–P Slow Base-5 Clock (v1)

Epoch: 2026-03-03T00:00:00Z

State duration: 144 hours

Cycle length: 30 days

Nodes must:

Read the current clock state

Detect state transitions

Replace exactly one panel per transition

Replace sequentially (1 → 2 → 3 → 4 → 5 → 1)

Never edit an existing panel

Never batch replace

Never skip a state


Timing is determined strictly by UTC.

Nodes must not:

Adjust the epoch

Modify state duration

Apply local corrections

Pause the cycle


The clock governs.

The Node follows.


---

## Replacement Logic

On each state transition (every 144 hours):

1. Replace one panel


2. Advance to the next panel in sequence


3. Record UTC timestamp


4. Continue operation



After five transitions (30 days), a full cycle completes.

The sequence repeats indefinitely.


---

## Feed Contribution

Each Node contributes to the public feed.

Requirements:

Capture one image per hour (UTC)

Stamp each image with:

 - UTC timestamp

- Clock state index (0–4)

- Node ID


Append images sequentially to the Feed archive


If an image is not captured:

- Insert a black frame

- Stamp with UTC timestamp and state index


Absence does not interrupt the chain.

The feed functions as a continuous visual ledger from genesis to present.


---

## Node Registration

Each Node must register once with:

```
{
  "node_id": "NODE-001",
  "location": "City / Country",
  "installation_date": "UTC timestamp",
  "panel_format": "5 × 70x100cm"
}

```

Registration establishes identity.

Operation establishes legitimacy.


---

## Integrity Conditions

A Node is considered active if:

It remains synchronized to the Base-5 Clock

It performs replacement on each state transition

It contributes hourly images without breaking sequence


A Node that stops updating remains in the archive but is no longer active.


---

## Governance

Version 1 Nodes operate under:

Immutable epoch

Immutable state duration

Deterministic time calculation

No lunar correction

No geographic adjustment


Future versions, if defined, must not modify v1 behavior.


---

## Principle

A Node does not interpret the protocol.
A Node executes the protocol.

Time is the structure.
Replacement is the act.
Continuity is the proof.



