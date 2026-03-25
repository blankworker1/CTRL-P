# FEED INFRASTRUCTURE 

The complete end-to-end flow from camera to web page, including hardware, software, and upload/feed logic.


---

## CTRL–P Feed Infrastructure

**Overview**

CTRL–P is a time-based visual feed protocol that captures one image per hour from a fixed camera, builds an append-only timeline, and makes it accessible via a web interface.

The system is designed to be minimal, robust, and deterministic, with failure always visible (black frames).

This document explains the hardware and software architecture, the capture and storage pipeline, and how the feed is delivered to the web interface.


---

**1. Hardware Requirements**

Node Components

Each CTRL–P Node includes:

```
Component	   Specification	         Notes
Camera	     TP-Link Tapo C510W	         Wi-Fi enabled, RTSP stream required
Controller     Raspberry Pi Zero 2 W     Quad-core, 512MB RAM, runs capture & upload scripts
Storage	       32–128GB microSD	       Industrial-grade preferred
Connectivity   4G router or USB modem	   Provides internet for uploads
Power	         5V stable supply (≥2.5A)Protects against brownouts, optional UPS recommended
Mounting	   Fixed, stable surface	 Prevents movement; ensures consistent framing

```

---

**2. Software Requirements**

Node Software

OS: Raspberry Pi OS Lite (no desktop, UTC timezone)

Packages:

ffmpeg (for RTSP frame capture)

curl or rclone (for uploads)


Scripts:

capture.sh – captures image, generates black frame on failure

upload.sh – uploads images to cloud storage


Scheduler: systemd timers (reliable, persistent, ensures hourly capture)


Cloud Infrastructure

Cloudflare R2 – append-only object storage for image archive

Cloudflare Worker – serves images via deterministic URLs, returns black frame if missing

GitHub Pages – frontend interface for timeline display (static site)



---

**3. Capture Flow (Node)**

1. Determine timestamp – UTC-based hourly timestamp: YYYYMMDD_HH_UTC.


2. Capture image from RTSP stream using ffmpeg.


3. Validate image – if missing or corrupted, generate black frame.


4. Save locally in folder structure:



/data/raw/{YYYY}/{MM}/{DD}/{YYYYMMDD_HH_UTC}.jpg

Local storage acts as buffer in case of network failure.

Files are append-only; no deletion or overwrite occurs.



---

**4. Upload Flow (Node → Archive)**

4.1. Node scans local storage for files not yet uploaded.


4.2. Uploads images to Cloudflare R2 bucket, preserving folder structure:



rclone copy /data/raw/node-001 r2:bucket-name/node-001

4.3. Upload failures are retried automatically; local copy remains intact.


4.4. Black frames are uploaded just like real captures to preserve timeline determinism.


4.5. No database is required; object store is the canonical archive.




---

**5. Cloud Archive (R2)**

Each image is stored as a permanent object in R2:


/{node_id}/{YYYY}/{MM}/{DD}/{YYYYMMDD_HH_UTC}.jpg

Immutability and append-only nature ensure full historical archive.

Optional: bucket versioning for additional integrity.

Can be served directly via CDN or proxied through a Worker.



---

**6. Web Feed Interface**

Frontend

Hosted on GitHub Pages (static site)

Knows:

node_id

start_date


Generates deterministic URLs for images:


https://worker.example.workers.dev/{node_id}/{YYYY}/{MM}/{DD}/{YYYYMMDD_HH_UTC}.jpg

Displays black frame if image does not exist (404).


Worker Logic

1. Receives request for image.


2. Checks R2 bucket for object.


3. If object exists → returns image.


4. If object missing → returns black frame.



Timeline Reconstruction

Frontend does not query existence of files.

Timeline is fully deterministic from node start date → present.

Optional optimizations:

Lazy loading by day or hour

Precomputed thumbnails for faster rendering




---

**7. Failure Handling**

```
Failure Mode	  Behavior
Camera offline	Black frame generated locally
Node offline	  Image missing for that hour
Network down	  Upload delayed; black frame may temporarily appear
Upload fails. 	Retry later, no overwrite
Pi crash	      Systemd timer ensures next capture resumes after reboot

```

Principle: Failure is visible and deterministic, never silently hidden.


---

**8. Optional Enhancements**

Cloudflare Worker can serve multiple nodes.

Edge caching via Cloudflare CDN improves global feed performance.



---

**9. Summary**

CTRL–P feed infrastructure is:

1. Hardware: TP-Link camera + Raspberry Pi Zero 2 W + 4G connectivity


2. Node software: Capture script, black frame fallback, upload to R2


3. Archive: Cloudflare R2 object storage (append-only, immutable)


4. Worker: Edge-serving with deterministic fallback for missing frames


5. Frontend: GitHub Pages static site, generates timeline based on UTC timestamps


6. Failure visibility: Black frames for missing images; all failures are deterministic



This design achieves:

Minimal infrastructure

Robust, long-term operation

Simple, deterministic, append-only visual timeline

No backend or database required

