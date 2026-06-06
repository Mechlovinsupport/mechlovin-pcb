---
name: Densus Alveus
slug: densus-alveus
subtitle: "Commissioned PCB for the Densus Alveus keyboard. "
rev: "1"
type: commission
layout: TKL
released: "2023"
featured: false
images:
  - https://i.imgur.com/5wsg5Wv.png
  - https://i.imgur.com/rigqniR.jpeg
  - https://i.imgur.com/LWJ8p3D.jpeg
switches:
  - mx
specs:
  firmware: QMK
  connector: USB-C Daughterboard
  mcu: ARM STM32
  rgb: None
  thickness: 1.6mm
  material: FR4
  solderMask: Red
  custom:
    - key: DB Standard
      value: Molex
layouts:
  - svg: /layouts/densus-alveus.svg
downloads:
  - kind: QMK Firmware
    url: https://github.com/mechlovin/PCB/blob/master/Densus/Alveus/densus_alveus_mx_via.bin
compatibility:
  - title: Case fitment
    body: "This PCB design fits the Densus Alveus keyboard specifically. "
---
