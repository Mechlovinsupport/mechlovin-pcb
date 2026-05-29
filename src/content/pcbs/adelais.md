---
name: "Adelais"
slug: "adelais"
subtitle: "65% hot-swap PCB · MLV-AD-65-V12"
rev: "Rev. 1.2"
status: "in-production"
layout: "65%"
released: "Mar 2024"
layoutSvg: "/layouts/zed60-layout.svg"
lede: "A 65% layout PCB with south-facing hot-swap sockets, per-key RGB, USB-C via daughterboard, and QMK / VIA support."
featured: true
switches: ["mx"]
features: ["hot-swap","per-key-rgb"]
connection: "wired"
connector: "daughterboard"
mount: ["tray","gasket"]
specs: [{"key":"Layout","value":"65% · 68 keys"},{"key":"PCB size","value":"317.5 × 105.0 mm"},{"key":"Thickness","value":"1.6 mm"},{"key":"Finish","value":"ENIG · matte black"},{"key":"Switch type","value":"MX-style"},{"key":"Hot-swap sockets","value":"Kailh CPG151101S11"},{"key":"Spacebar orientation","value":"South-facing"},{"key":"Encoder","value":"Optional · EC11 footprint"},{"key":"MCU","value":"ATmega32U4 @ 16 MHz · 32 KB flash"},{"key":"Connector","value":"USB-C via daughterboard"},{"key":"RGB","value":"68 × SK6812-Mini-E (per-key) + underglow header"}]
downloads: [{"kind":"QMK Firmware","file":"/files/adelais-v0.24.3.hex","description":"Latest QMK build with VIA support. Flash with QMK Toolbox.","external":"https://github.com/mechlovin/adelais"},{"kind":"VIA JSON","file":"/files/adelais.json","description":"Keymap definition. Load in the VIA web app.","external":"https://usevia.app"},{"kind":"3D Model","file":"/files/adelais.step","description":"PCB model for case designers and clearance checks."}]
compatibility: [{"title":"Cases","body":"Designed for the Adelais Tray Mount and Adelais Gasket Edition cases. Also drops into the KBDfans Tofu65 if you relocate the daughterboard to the front-right standoff (cable will reach). The Qwertykeys QK65 is NOT compatible — mount points differ."},{"title":"Plates","body":"FR4, polycarbonate, and brass plates are all confirmed. Aluminum plates work but mind the plate-to-PCB clearance — the south-facing diodes can foul if your case uses an integrated plate."},{"title":"Switches","body":"All MX-style 3-pin and 5-pin switches work. Kailh Box switches confirmed. Low-profile switches are not supported — this is a full-height-only PCB."},{"title":"Stabilizers","body":"PCB-mount screw-in stabilizers (Cherry, Durock, C³ Equalz, GMK) all fit. Plate-mount stabs are not supported. 2u stabilizers required for Backspace and Right Shift; 6.25u for Spacebar."}]
changelog: [{"rev":"Rev. 1.2","date":"Mar 2025","current":true,"summary":"Quality-of-life revision focused on flashing reliability and per-key RGB consistency on the bottom row.","items":[{"kind":"fix","text":"Resolved bootloader timing issue on first flash from blank ATmega32U4."},{"kind":"fix","text":"Corrected RGB chain order on bottom row (LEDs 56–68 were reversed)."},{"kind":"chg","text":"Daughterboard ribbon changed from 6-pin JST to 5-pin Molex Pico-Clasp."},{"kind":"add","text":"On-board reset button accessible without case removal."}]},{"rev":"Rev. 1.1","date":"Sep 2024","current":false,"summary":"Layout flexibility expansion. Adds split-shift and split-backspace options.","items":[{"kind":"add","text":"Split backspace footprint with optional 1u + 1u stab."},{"kind":"add","text":"Split left-shift footprint (1.25u + 1u)."},{"kind":"chg","text":"South-facing diodes for unobstructed Cherry-profile clearance."}]},{"rev":"Rev. 1.0","date":"Mar 2024","current":false,"summary":"Initial production release.","items":[{"kind":"add","text":"ANSI 65% hot-swap PCB with per-key RGB."},{"kind":"add","text":"USB-C daughterboard with JST connector."},{"kind":"add","text":"QMK / VIA support at launch."}]}]
vendors: [{"name":"Mechlovin Store","region":"Vietnam · Direct","stock":"in","price":"$59.00","shipping":"Worldwide · 5–9 d","url":"https://mechlovin.studio/products/adelais"},{"name":"KBDfans","region":"CN","stock":"in","price":"$65.00","shipping":"International · 7–14 d","url":"https://kbdfans.com"},{"name":"Cannonkeys","region":"USA","stock":"low","price":"$69.00","shipping":"Domestic · 2–4 d","url":"https://cannonkeys.com"},{"name":"Mykeyboard.eu","region":"EU","stock":"in","price":"€62.00","shipping":"EU · 3–5 d","url":"https://mykeyboard.eu"},{"name":"Daily Clack","region":"USA","stock":"out","price":"$72.00","shipping":"—","url":"https://dailyclack.com"},{"name":"Ilumkb","region":"CN","stock":"in","price":"$58.00","shipping":"International · 10–18 d","url":"https://ilumkb.com"}]
---

<!-- Optional free-form notes about this PCB. The page renders the frontmatter above. -->
