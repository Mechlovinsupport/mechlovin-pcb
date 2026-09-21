---
name: ZED60 - Derivative
slug: zed60-derivative
subtitle: Commissioned PCB for JJW Derivative keyboard
type: commission
layout: 60%
released: "2023"
featured: false
images:
  - https://i.imgur.com/Fpq8rdR.png
  - https://i.imgur.com/UcK6gvT.jpeg
switches:
  - mx
specs:
  firmware: QMK
  connector: USB-C Daughterboard
  mcu: ARM STM32
  rgb: None
  thickness: 1.6mm
  material: FR4
  solderMask: Gray / Black
layouts:
  - svg: /layouts/zed60-derivative.svg
downloads:
  - kind: Firmware
    url: https://github.com/mechlovin/PCB/tree/master/60-PCB/Zed60/Firmware
changelog:
  - current: false
    date: "2023"
    summary: Original global run version
    items:
      - kind: add
        text: ISO layout support
  - current: false
    date: 2024 - 2025
    items:
      - kind: add
        text: PCB edge offset
      - kind: chg
        text: Light gray soldermask with black core FR4 substrate
  - current: false
    date: 2026 - 2027
    items:
      - kind: chg
        text: Updated aesthetic
      - kind: chg
        text: Gloss black soldermask with black core FR4 substrate
---
