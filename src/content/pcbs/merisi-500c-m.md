---
name: Merisi 500C/M
slug: merisi-500c-m
subtitle: Commissioned PCB design for the Merisi 500C/M TKL keyboard
rev: Infinity 87 Rev. 3
type: commission
layout: TKL
released: "2024"
featured: false
images:
  - https://i.imgur.com/2iycSWi.jpeg
  - https://i.imgur.com/B66a0YH.png
  - https://i.imgur.com/O9Rh1fj.jpeg
switches:
  - mx
specs:
  firmware: QMK
  connector: Custom USB-C Daughterboard
  mcu: ARM STM32
  rgb: None
  thickness: 1.6mm
  material: FR4
  solderMask: Matte Black
  custom:
    - key: DB Standard
      value: JST-SH
layouts:
  - svg: /layouts/merisi-tkl.svg
downloads:
  - kind: QMK Firmware & VIA JSON
    url: https://github.com/mechlovin/PCB/tree/master/TKL%20PCB%20-%20Infinity%20Series/Infinity87/Firmware/Rev3/Standard
compatibility:
  - title: Case fitment
    body: This PCB design fits the Merisi 500C/M TKL keyboard specifically
---
