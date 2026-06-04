---
name: Hex 4B
slug: hex-4b
subtitle: Commissioned PCB for the Hex 4B keyboard.
rev: "2"
type: commission
layout: 75%
released: "2023"
featured: false
images:
  - https://i.imgur.com/0TZfBIC.png
  - https://i.imgur.com/AMqZP9z.jpeg
switches:
  - mx
specs:
  firmware: QMK
  connector: Onboard USB-C
  mcu: ARM STM32
  rgb: None
  thickness: 1.6mm
  material: FR4
  solderMask: Black/ Red/ White
layouts:
  - svg: /layouts/hex-4b.svg
downloads:
  - kind: QMK Firmware
    url: https://github.com/mechlovin/PCB/tree/master/Hex-Keyboard/Hex4b/Rev1
    description: Rev. 1
  - url: https://github.com/mechlovin/PCB/tree/master/Hex-Keyboard/Hex4b/Rev2-APM32F103/Firmware
    kind: QMK Firmware
    description: Rev. 2
compatibility:
  - title: Case fitment
    body: "This PCB design fits the Hex 4B keyboard specifically. "
  - title: Switch fitment
    body: "Hex 4B is a plateless (direct PCB-mounting) board so please make sure to
      use 5-pin switches for your build. "
changelog:
  - current: false
    rev: Revision 1
    date: "2022"
    summary: Original version
  - current: true
    rev: Revision 2
    date: "2023"
    summary: "Overall redesign with ARM STM32 MCU for improved stability. "
vendors:
  - name: Mechlovin'
    region: Global
    stock: in
    url: https://mechlovin.studio/products/commission-clearance
    price: $39
    shipping: Worldwide
---
