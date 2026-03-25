# CTRL–P Feed Infrastructure v2.0

**Overview**

CTRL–P is a time-based visual feed protocol designed for remote, off-grid archival. It captures one high-quality image per hour from a fixed camera, building an immutable, append-only timeline. This version focuses on a fully self-contained, "network-in-a-box" deployment that requires no internet for operation, making data retrieval simple and user-friendly via a local web interface.

The system is designed to be minimal, robust, and deterministic, with failure always visible (black frames) and all interactions managed through an elegant local control panel.

---

## 1. Hardware Requirements

Node Components

Each CTRL–P Node includes:

```
Component	   Specification	                      Notes
Camera	       TP-Link Tapo C510W	                  Wi-Fi enabled, configured for RTSP
Controller     Raspberry Pi Zero 2 W (RP3A0)          Quad-core 1GHz CPU, 512MB RAM, Wi-Fi AP
RTC Module	   DS3231 Real-Time Clock	              Maintains accurate time without internet
Storage	       128GB microSD (Industrial-grade)      For Pi OS, scripts, and image archive
Connectivity   None required (Standalone AP)	      Creates its own Wi-Fi network
Power	       12V Solar System (Victron 75/15)      Powers camera & Pi via buck converter
Mounting	   Fixed, stable surface	              Prevents movement; ensures consistent framing

```

---

## 2. Raspberry Pi Software Architecture

The Pi is the heart of the node, acting as a clock, a network host, a data capture device, and a web server. The software is layered to ensure reliability and autonomous operation.

### 2.1. Core OS and Base Services

*   **OS:** Raspberry Pi OS Lite (64-bit) with UTC timezone.
*   **Init System:** `systemd` for managing all services and ensuring they start on boot.
*   **Time Management:**
    *   `i2c-tools` and `rtc-ds3231` kernel module are enabled to read time from the DS3231 hardware clock at boot.
    *   `ntpd` is installed but configured to use the local RTC as its primary time source, acting as a Stratum 1 time server for the local network.
*   **Memory Management:** A 1GB swap file is created on the SD card to prevent out-of-memory errors under load.

### 2.2. Network Infrastructure

*   **Access Point (`hostapd`):** Creates a standalone Wi-Fi network named `Tapo_Field_Net` with a WPA2 password. The Pi's interface `wlan0` is assigned a static IP of `192.168.4.1`.
*   **DHCP & DNS (`dnsmasq`):**
    *   Acts as the DHCP server, assigning IP addresses (e.g., `192.168.4.10`) to clients that connect to the AP (like the camera and the user's laptop).
    *   Acts as the DNS server with two critical custom rules:
        1.  **Time Server Spoofing:** All requests for `time.windows.com` and `pool.ntp.org` are resolved to `192.168.4.1`. This forces the Tapo camera to sync its clock with the Pi's RTC.
        2.  **Captive Portal Redirection:** All other DNS requests (`address=/#/192.168.4.1`) are resolved to `192.168.4.1`. This forces any user connecting to the Wi-Fi to see the Pi's local web interface, regardless of what URL they type in their browser.

### 2.3. Data Capture and Storage

*   **Capture Script (`capture.sh`):** A `systemd` timer triggers this script once every hour, at the top of the hour.
    *   It uses `ffmpeg` to connect to the camera's RTSP stream (`rtsp://USER:PASS@192.168.4.X:554/stream1`).
    *   It captures a single frame (`-vframes 1`) with high quality (`-q:v 2`) after a short seek (`-ss 2`) to ensure the buffer is full.
    *   The command is wrapped in a `timeout 30s` to prevent hangs.
    *   The output is saved with a deterministic filename: `/home/pi/stills/img_$(date +%Y%m%d_%H).jpg`.
    *   **Failure Handling:** If `ffmpeg` fails (e.g., camera offline), the script generates a black frame of the same resolution to preserve timeline integrity.

### 2.4. User Interface and Data Retrieval

*   **Web Server (Python Flask):** A lightweight Flask application runs as a `systemd` service on port 80.
    *   **Backend (`app.py`):**
        *   Serves the main HTML page at the root URL (`/`).
        *   Handles a `/download` route. When triggered, it scans the `/home/pi/stills/` directory, dynamically creates a ZIP archive of all `.jpg` files, and sends it to the user as a downloadable attachment.
    *   **Frontend (`templates/index.html`):** A simple, clean HTML page providing system status (last capture time, total images) and a prominent "Download All Images" button.

---

## 3. End-to-End User Workflow

This workflow covers the entire process from initial setup to retrieving the image archive.

### Step 1: Initial Camera Pairing (At Home)

This one-time setup requires internet.
1.  Connect your phone and the Tapo C510W to your home Wi-Fi.
2.  Using the Tapo app, create a camera account (Username/Password) for RTSP access.
3.  In the camera's settings, change its Wi-Fi credentials to match the Pi's future AP (`Tapo_Field_Net` and your chosen password).
4.  Power down the camera. It is now configured and will seek out the Pi's network upon power-up.

### Step 2: Field Deployment

1.  Physically mount the camera and Pi in their final, fixed positions.
2.  Connect the camera and Pi to the solar power system.
3.  Power on the system. The Pi will boot, initialize its RTC, create the Wi-Fi AP, and start the NTP server.
4.  Power on the camera. It will connect to the `Tapo_Field_Net` AP, receive its time from the Pi, and begin streaming.

### Step 3: Autonomous Operation

*   The system now runs unattended.
*   Every hour, the Pi's `capture.sh` script snaps a still from the camera's stream and saves it locally.
*   The camera continues to record 24/7 video to its own SD card as a redundant backup.
*   The Pi's web server is always running, waiting for a connection.

### Step 4: Image Retrieval (In the Field)

This is the new, simplified retrieval process.
1.  **Approach the Node:** A field technician arrives on-site with a laptop.
2.  **Connect to Wi-Fi:** On the laptop, open the Wi-Fi settings and connect to `Tapo_Field_Net`.
3.  **Open Browser:** Launch any web browser (e.g., Chrome, Firefox).
4.  **Access Control Panel:** Type any website address (e.g., `google.com`). Due to the DNS redirection, the browser will load the CTRL–P control panel from the Pi at `http://192.168.4.1`.
5.  **Download Archive:** On the control panel webpage, click the **"Download All Images (.zip)"** button. The browser will begin downloading a single ZIP file containing all images captured since the last retrieval.
6.  **Completion:** Once the download is finished, the technician can disconnect from the Wi-Fi and leave. The node continues its operation uninterrupted.

---

## 4. Summary of the v2.0 Architecture

This design achieves a highly robust and user-friendly archival system:

1.  **Hardware:** A self-contained unit (Pi Zero 2 W + Camera + RTC) powered by solar.
2.  **Network:** A private, standalone Wi-Fi network provides time sync and a user interface, eliminating the need for 4G connectivity.
3.  **Software Architecture:** A layered stack of services (`hostapd`, `dnsmasq`, `ntpd`, `systemd` timers, Flask) ensures autonomous, reliable operation.
4.  **Data Integrity:** Hourly captures are stored in an append-only local archive, with black frames marking failures.
5.  **User Experience:** A "zero-config" web interface makes data retrieval as simple as connecting to Wi-Fi and clicking a button, with no technical knowledge required.
