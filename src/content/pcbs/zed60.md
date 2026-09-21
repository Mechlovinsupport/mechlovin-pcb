---
name: Zed60 - Stock
slug: zed60
subtitle: Universal 60% PCB
rev: "1.2"
type: stock
layout: 60%
released: "2023"
featured: false
images:
  - https://i.imgur.com/DFMNTTd.jpeg
  - https://i.imgur.com/70cMCeU.jpeg
  - https://i.imgur.com/UCw6Gio.jpeg
switches:
  - mx
specs:
  firmware: QMK
  connector: USB-C (Onboard & Daughterboard)
  mcu: ARM STM32
  rgb: Underglow
  thickness: 1.6mm
  material: FR4 or CEM-3
  solderMask: Purple / Red / Green
  custom:
    - key: JST Standard
      value: JST-SH or JST-SUR
layouts:
  - svg: /layouts/zed60-layout.svg
downloads:
  - kind: Firmware
    url: https://github.com/mechlovin/PCB/tree/master/60-PCB/Zed60/Firmware
  - kind: STEP Model
    url: https://github.com/mechlovin/PCB/tree/master/60-PCB/Zed60
changelog:
  - current: false
    rev: Rev. 1
    date: "2023"
    summary: Original version
  - current: false
    rev: Rev. 1.1
    date: "2024"
    summary: Minor fixes and improvements
    items:
      - kind: add
        text: Markings for 3 JST footprints
      - kind: add
        text: Keepout zone for spacebar stabilizer area
      - kind: add
        text: Resistor for USB 3.0 PD cable support
      - kind: chg
        text: Position 3 JST-SH connector to support JJW Derivative
  - current: true
    rev: Rev. 1.2
    date: "2025"
    summary: Minor fixes and improvements
    items:
      - kind: add
        text: Support for QK60 keyboard
      - kind: add
        text: JST-SUR low-profile connector to improve compatibility
vendors:
  - name: Mechlovin' Store
    region: Global
    stock: in
    shipping: Worldwide
    price: $42
    url: https://mechlovin.studio/products/fr4-mechlovin-zed60-60-pcb
---
