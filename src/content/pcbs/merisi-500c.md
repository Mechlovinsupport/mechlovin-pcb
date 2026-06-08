---
name: Merisi 500C
slug: merisi-500c
subtitle: Commissioned PCB design for the Merisi 500C keyboard
rev: ZED65 Rev. 1
type: commission
layout: 65%
released: "2023"
featured: false
images:
  - https://i.imgur.com/qRDQIxj.jpeg
  - https://i.imgur.com/mbY0a5R.jpeg
  - https://i.imgur.com/qab33EJ.jpeg
switches:
  - mx
specs:
  firmware: QMK & VIA
  connector: Custom USB-C Daughterboard
  mcu: ARM STM32
  rgb: N/A
  thickness: 1.6mm
  material: FR4
  solderMask: Matte Black
  custom:
    - key: DB Standard
      value: JST-SH
layouts:
  - svg: /layouts/zed65-hotswap.svg
downloads:
  - kind: QMK Firmware & VIA JSON
    url: https://github.com/mechlovin/PCB/tree/master/Zed65/Rev1/Firmware/Rev1%20%26%20Rev1.1
compatibility:
  - title: Case fitment
    body: This PCB design fits the Merisi 500C keyboard specifically
changelog: []
---
