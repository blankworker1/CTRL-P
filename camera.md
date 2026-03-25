# CAMERA


---

## CTRL–P Camera Specification (v1)

The Camera is the capture device for a Node.

It records the physical state of the installation at fixed intervals.

The Camera does not interpret the scene.
It documents it.


---

**Definition**

Each Node includes one Camera.

The Camera is:

Fixed in position

Permanently mounted

Continuously powered

Aligned to UTC time


It produces one image per hour.


---

**Positioning**

The Camera must:

Capture all five panels within a single frame

Maintain a constant angle and distance

Remain unchanged after installation


The frame is fixed.

No re-framing.
No zoom.
No repositioning.

Environmental changes (light, shadow, obstruction) are accepted.


---

**Capture Interval**

The Camera captures:

One image per hour

At the start of each UTC hour


Example:

00:00
01:00
02:00

Capture timing must align to UTC boundaries.
Relative intervals are not permitted.


---

**Capture Method**

The Camera operates independently of the Interface.

Capture may be triggered by:

Local scheduler (cron)

Device-level automation


The Camera does not depend on user interaction.


---

**File Naming**

Each image must follow a deterministic format:

YYYYMMDD_HH_UTC.jpg

Example:

20260303_00_UTC.jpg
20260303_01_UTC.jpg

Filenames define sequence and order.


---

**Image Properties**

Images must remain consistent:

Fixed resolution

Fixed orientation (landscape)

Fixed format (JPG)


No:

Filters

Overlays

Cropping

Post-processing


The image is a direct capture.


---

**Upload**

Each captured image must:

1. Be stored locally


2. Be uploaded to the Feed storage


3. Be appended in chronological order



Upload should occur immediately after capture.


---

**Absence Handling**

If an image is not captured or uploaded:

A black frame is generated

The frame follows the same filename structure

The sequence continues without interruption


Absence is recorded, not corrected.


---

**Storage Structure**

Images are stored as an append-only sequence:

/feed/{node_id}/YYYYMMDD_HH_UTC.jpg

No deletion.
No overwriting.
No reordering.


---

**Failure Conditions**

The Camera may fail due to:

Power loss

Network interruption

Hardware fault


In all cases:

The Feed continues

Missing frames are represented as black images


The system does not compensate for failure.


---

**Relationship to the Protocol**

The Camera does not:

Control timing

Trigger panel replacement

Interpret clock state


The Camera records the result of the protocol.


---

**Principle**

The Camera is fixed.
The interval is fixed.
The sequence is continuous.

What changes is the environment.

Time is visible through accumulation.
