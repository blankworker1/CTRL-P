# INTERFACE


---

## CTRL–P Interface Specification (v1)

The Interface is the public access layer of the CTRL–P protocol.

It renders visibility. It does not govern operation.

The Interface is a reference implementation.

The protocol functions independently of it.


---

## Definition

The Interface provides access to:

- Protocol documentation

- Registered Nodes

- Active Cycles

- The Feed

It subscribes to the CTRL–P Slow Base-5 Clock (v1).

It does not calculate time locally.


---

## Structural Position

The system hierarchy is:

Clock (governs time)

→ Nodes (execute replacement)

→ Cycles (define 30-day structure)

→ Feed (records continuity)

→ Interface (renders visibility)

The Interface exists at the outer layer.


---

## Navigation Model

The Interface is a webapp with a persistent control element: ctrl–p.art tag with a fixed position on screen, 
expandable from right to left,accessible on all pages and acts as universal navigation tool. 


No additional menus

No back buttons


Available sections:

- Protocol

- Nodes

- Cycles

- Feeds


All sections are accessed exclusively through the persistent tag.


---

## Clock Rendering Rules

The Interface subscribes to the Base-5 Clock module.

Clock usage:

Protocol page: full black circle (state 0 visual)

Feed page: watermark indicating current clock state

Watermark auto-contrasts (black on light, white on dark)

Watermark positioned consistently (top-right)


The Interface does not:

Display countdown timers

Display lunar references

Explain clock logic within the UI

Modify clock state


The clock remains infrastructural.


---

## Nodes View

The Interface also provides:

- A map of registered Nodes

- Node status (active / inactive)

- Node start date

- Access to individual Node feeds


The Interface does not:

Alter Node behavior

Control replacement timing

Override clock state



---

## Feed View

The Feed is presented as:

- A continuous archive of chronologically sequenced images, with horizontal drag navigation

- An mmutable image ledger for every Node


Features may include:

State-based filtering

Time-lapse export

Node selection


The Interface does not:

Remove images

Reorder entries

Mask interruptions


Black frames remain visible.


---

## Design Constraints

The Interface should remain:

Minimal

Functional

Non-narrative

Non-metric

Non-interventionist


It should not introduce:

Social features

Engagement counters

Commentary layers

Algorithmic prioritization


The Interface displays. It does not interpret.


---

## Independence

The CTRL–P protocol continues if the Interface is removed.

Clock, Nodes, Cycles, and Feed operate independently.

The Interface is replaceable. The protocol is not.


---

## Principle

The Interface is a window.

It does not influence time.

It does not influence replacement.

It does not influence continuity.

It reveals what the system already produces.



