---
name: Adelais Standard Rev. 4/5
slug: adelais-standard-rev-4-5
subtitle: Alice layout PCB with underglow RGB
rev: "5"
type: stock
layout: Ergo
released: "2025"
featured: true
images:
  - https://i.imgur.com/fI7z96g.jpeg
  - https://i.imgur.com/j1CW3UA.jpeg
  - https://i.imgur.com/0gHBIZ7.jpeg
switches:
  - mx
specs:
  firmware: QMK
  connector: USB-C (Onboard & Daughterboard)
  mcu: ARM STM32
  rgb: Underglow
  thickness: 1.6mm
  material: FR4
  solderMask: Black, White, Purple
  custom:
    - key: Switch Installation
      value: Solder & Hotswap
layouts:
  - svg: /layouts/adelais-solder.svg
    caption: Solder Version
  - svg: /layouts/adelais-en-ciel-hotswap.svg
    caption: Hotswap Version
downloads:
  - kind: QMK Firmware
    description: Rev. 4
    url: https://github.com/mechlovin/PCB/tree/master/Adelais/Firmware/Adelais-Rev4
  - kind: QMK Firmware
    description: Rev. 5
    url: https://github.com/mechlovin/PCB/tree/master/Adelais/Firmware/Adelais-Rev5
compatibility:
  - body: >-
      
      There are two versions of this PCB: USB-C and Mini-USB. Please note the TGR Alice (aluminium and PC) only fits Mini-USB.
    title: Case fitment
vendors:
  - name: Mechlovin'
    region: Global
    stock: in
    price: $48-$55
    shipping: Worldwide
    url: https://mechlovin.studio/products/adelais-tgr-alice-compatible-pcb
---
