---
name: Infinity 88 Hotswap
slug: infinity-88-hotswap
subtitle: Drop-in compatible hotswap PCB solution for F13 TKL keyboards.
rev: "3.1"
type: stock
layout: TKL
released: "2024"
featured: true
images:
  - https://i.imgur.com/D2VGirM.png
  - https://i.imgur.com/GMCkc1f.jpeg
  - https://i.imgur.com/vHzvlwM.jpeg
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
      value: JST-SH
layouts:
  - svg: /layouts/infinity-88-hotswap.svg
downloads:
  - kind: QMK Firmware & VIA JSON
    url: https://github.com/mechlovin/PCB/tree/master/TKL%20PCB%20-%20Infinity%20Series/Infinity88/Rev3
compatibility:
  - title: Case fitment
    body: >+
      This is Mechlovin's stock F13 TKL PCB designed to fit a variety of custom
      F13 TKL keyboards. It supports onboard USB-C and JST connector (for
      daughterboard use) in several different positions.

changelog:
  - current: false
    rev: Rev. 3
    date: "2023"
    summary: Original version
    items: []
  - current: true
    rev: Rev. 3.1
    items:
      - kind: chg
        text: "Revised PCB outline for improved fitment. "
vendors:
  - name: Mechlovin'
    region: Global
    stock: in
    price: $57
    shipping: Worldwide
    url: https://mechlovin.studio/products/mechlovin-infinity-87-88-hotswap-pcb
---
