---
name: Infinity 87 Hotswap
slug: infinity-87-hotswap
subtitle: Drop-in compatible hotswap PCB solution for F12 TKL keyboards.
rev: "3.1"
type: stock
layout: TKL
released: "2024"
featured: true
images:
  - https://i.imgur.com/Mhqwcok.png
  - https://i.imgur.com/ETvVzGQ.jpeg
  - https://i.imgur.com/4X2L5YW.jpeg
lede: ""
switches:
  - mx
specs:
  firmware: QMK
  connector: USB-C (Onboard & Daughterboard)
  mcu: ARM STM32
  rgb: Underglow
  thickness: 1.6mm
  material: FR4
  solderMask: Matte Black
  custom:
    - key: DB Standard
      value: JST-SH or JST-SUR
layouts:
  - svg: /layouts/infinity-87-hotswap.svg
downloads:
  - kind: QMK Firmware & VIA JSON
    url: https://github.com/mechlovin/PCB/tree/master/TKL%20PCB%20-%20Infinity%20Series/Infinity87/Firmware/Rev3/Standard
  - url: https://github.com/mechlovin/PCB/tree/master/TKL%20PCB%20-%20Infinity%20Series/Infinity87/Step-files
    kind: STEP model
compatibility:
  - title: Case fitment
    body: >+
      This is Mechlovin's stock F12 TKL PCB designed to fit a variety of custom
      TKL keyboards. It supports onboard USB-C and JST connector (for
      daughterboard use) in several different positions.

changelog:
  - current: false
    rev: Rev. 3
    date: "2023"
    summary: Original version
    items: []
  - current: true
    rev: Rev. 3.1
    date: "2024"
    items:
      - kind: chg
        text: Revised PCB outline for improved fitment
      - kind: add
        text: JST-SUR low-profile connector footprint
    summary: Minor fixes
vendors:
  - name: Mechlovin'
    region: Global
    stock: in
    price: $57
    shipping: Worldwide
    url: https://mechlovin.studio/products/mechlovin-infinity-87-88-hotswap-pcb
---
