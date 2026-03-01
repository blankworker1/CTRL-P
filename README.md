# CTRL-P



## CTRL–P Slow Base-5 Clock (v1)

A public, deterministic 5-state slow clock operating on a fixed 30-day cycle.

Designed as infrastructure, not decoration.

[Link](https://blankworker1.github.io/CTRL-P/)


---

## Specification (Immutable v1)

Epoch (UTC): 2026-03-03T00:00:00Z

Cycle Length: 30 days (720 hours)

State Duration: 144 hours (6 days)

States: 5

Time Standard: UTC only

Correction: None

Adjustment: None


Version 1 is fixed and does not change.


---

## State Sequence

```
State	  Day	  Description

0	      0	      Full black circle
1	      6	      Left 1/3 black
2	      12	  Left 2/3 black
3	      18	  Right 2/3 black
4	      24	  Right 1/3 black
0	      30	  Cycle repeats

```

The sequence progresses strictly by elapsed UTC time since epoch.


---

## Deterministic Logic

State is calculated as:
```
floor((current_utc - epoch) / 144 hours) mod 5
```
No external input.
No synchronization with lunar phases.
No human intervention.


---

## Usage

Embed
```
<div data-ctrlp-clock></div>
<script src="https://blankworker1.github.io/CTRL-P/clock.v1.js"></script>

```

The clock renders automatically and updates at each phase transition.


---

## Optional Size Parameter
```
<div data-ctrlp-clock data-size="150"></div>

```

Size is defined in pixels.


---

## Optional Preview (All States)
```
<div id="preview0"></div>
<div id="preview1"></div>
<div id="preview2"></div>
<div id="preview3"></div>
<div id="preview4"></div>
<div id="preview5"></div>

<script>
const stateSequence = [0,2,1,4,3,0]; // Day 0,6,12,18,24,30
const previewIds = ["preview0","preview1","preview2","preview3","preview4","preview5"];
previewIds.forEach((id, idx) => {
  const container = document.getElementById(id);
  const state = stateSequence[idx];
  container.appendChild(createSVG(state, 60));
});
</script>

```

---

## Philosophy

The clock is:

- Deterministic

- Immutable

- Independent of interface

- Independent of geography

- Independent of interpretation


It does not represent time.

It establishes a cycle.

Any system embedding this clock synchronizes with the CTRL–P time protocol.

Time is treated as structure.
Repetition establishes presence.
