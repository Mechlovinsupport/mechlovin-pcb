---
name: RAE Adamas 65
slug: rae-adamas-65
subtitle: Commissioned PCB design for the RAE Adamas 65 keyboard
rev: Zed65 Rev. 1.2
type: commission
layout: 65%
released: "2025"
featured: false
images:
  - https://i.imgur.com/nF8fEC5.png
  - https://i.imgur.com/NsQX1h5.png
  - https://i.imgur.com/udaAuqq.jpeg
switches:
  - mx
specs:
  firmware: QMK
  connector: Onboard USB-C
  mcu: ARM STM32
  rgb: None
  thickness: 1.6mm
  material: FR4
  solderMask: Blue (R1) / Black (R2)
  custom:
    - key: Surface finish
      value: Immersion tin (R1) / Gold (R2)
layouts:
  - svg: /layouts/gsk-tgr-910-mechlovin-zed65-solder.svg
    caption: Solder Version
  - svg: /layouts/gsk-tgr-910-mechlovin-zed65-hotswap.svg
    caption: Hotswap Version
downloads:
  - url: https://github.com/mechlovin/PCB/tree/master/Zed65/Rev1/Firmware/Rev1.2
    kind: QMK firmware & VIA JSON
compatibility:
  - title: Case fitment
    body: This PCB design fits the RAE Adamas 65 keyboard specifically
changelog:
  - current: false
    rev: Round 1
    date: "2025"
    summary: Original version. Blue solder mask.
  - current: true
    rev: Round 2
    date: "2026"
    summary: "Revised PCB outline. Black solder mask. "
---
