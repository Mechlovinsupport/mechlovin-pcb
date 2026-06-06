---
name: Infinity 87.5 FR4
slug: infinity-875
subtitle: Hybrid TKL 87 & 88 Solder PCB
rev: "2.2"
type: stock
layout: TKL
released: "2025"
featured: true
images:
  - https://i.imgur.com/cVhO1Wm.png
  - https://i.imgur.com/o8uLitx.png
switches:
  - mx
specs:
  firmware: QMK
  connector: Onboard USB-C, Mini-USB or JST
  mcu: ARM STM32
  rgb: Underglow
  thickness: 1.6mm
  material: FR4
  solderMask: White
  custom:
    - key: DB Standard
      value: JST-SH or JST-SUR
layouts:
  - svg: /layouts/infinity-87-5-exo.svg
    caption: ""
downloads:
  - kind: QMK Firmware
    url: https://github.com/mechlovin/PCB/blob/master/TKL%20PCB%20-%20Infinity%20Series/IF87.5/Rev1/Firmware/mechlovin_infinity875_via.hex
    description: Rev. 1 with Atmega32U4 MCU
  - kind: QMK Firmware & JSON VIA
    description: Rev. 2 with ARM STM32 MCU
    url: https://github.com/mechlovin/PCB/tree/master/TKL%20PCB%20-%20Infinity%20Series/IF87.5/Rev2
  - kind: 3D Model
    url: https://github.com/mechlovin/PCB/tree/master/TKL%20PCB%20-%20Infinity%20Series/IF87.5/Rev2/Step-file
    description: STEP file for case design
compatibility:
  - title: Case fitment
    body: "This PCB is designed to fit a large variety of TKL boards in both 87 & 88
      layouts. "
changelog:
  - current: false
    rev: Rev. 1
    date: "2022"
    summary: Original version with Atmega32U4 MCU
    items: []
  - current: false
    rev: Rev. 2
    date: "2023"
    summary: Changed platform to ARM STM32 MCU
  - current: false
    rev: Rev. 2.1
    date: "2024"
    summary: Minor fixes and improvements
    items:
      - kind: chg
        text: Rearranged underglow LEDs position to improve diffusion
      - kind: add
        text: Add a resistor for PD Type-C cable support
  - current: true
    rev: Rev. 2.2
    date: "2025"
    summary: Minor fixes and improvements
    items:
      - kind: add
        text: Add JST-SUR low profile connector footprint
vendors:
  - name: Mechlovin' Store
    price: $50
    shipping: Worldwide
    region: Global
    stock: in
    url: https://mechlovin.studio/products/mechlovin-infinity-87-5-87-88-tkl-layout-pcb
connection: null
---
