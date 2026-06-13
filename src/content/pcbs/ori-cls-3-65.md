---
name: Ori CLS-3//65
slug: ori-cls-3-65
subtitle: Commissioned PCB design for the Ori CLS-3//65 keyboard
rev: Zed65 Rev. 1.2
type: commission
layout: 65%
released: "2025"
featured: false
images:
  - https://i.imgur.com/1bD7q4t.jpeg
  - https://i.imgur.com/E9uJTvs.jpeg
  - https://i.imgur.com/nafPg9y.jpeg
switches:
  - mx
specs:
  firmware: QMK
  connector: USB-C Daughterboard
  mcu: ARM STM32
  rgb: None
  thickness: 1.6mm
  material: FR4
  solderMask: Gray, Red
  custom:
    - key: DB Standard
      value: JST-SH
layouts:
  - svg: /layouts/gsk-tgr-910-mechlovin-zed65-hotswap.svg
downloads:
  - kind: QMK Firmware & VIA JSON
    url: https://github.com/mechlovin/PCB/tree/master/Zed65/Rev1/Firmware/Rev1.2
compatibility:
  - title: Case fitment
    body: This PCB design fits the Ori CLS-3//65 keyboard specifically.
---
