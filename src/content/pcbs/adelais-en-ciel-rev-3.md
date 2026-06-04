---
name: Adelais En Ciel Rev. 3
slug: adelais-en-ciel-rev-3
subtitle: Alice layout PCB with full RGB support
rev: "3"
type: stock
layout: Ergo
released: "2023"
featured: false
images:
  - https://i.imgur.com/HVAWN22.jpeg
  - https://i.imgur.com/6wZI4Fn.jpeg
  - https://i.imgur.com/p4zLldi.jpeg
switches:
  - mx
specs:
  firmware: QMK
  connector: Onboard USB-C
  mcu: ARM STM32
  rgb: Underglow & Per-key
  thickness: 1.6mm
  material: FR4
  solderMask: Purple
  custom:
    - key: Swich Installation
      value: Solder & Hotswap
layouts:
  - svg: /layouts/adelais-solder.svg
    caption: Solder Version
  - svg: /layouts/adelais-en-ciel-hotswap.svg
    caption: Hotswap Version
downloads:
  - kind: QMK Firmware
    url: https://github.com/mechlovin/PCB/tree/master/Adelais/Firmware/Adelais-En-Ciel-Rev3
compatibility:
  - title: Case fitment
    body: "There are two versions of this PCB: USB-C and Mini-USB. Please note the
      TGR Alice (aluminium and PC) only fits Mini-USB."
---
