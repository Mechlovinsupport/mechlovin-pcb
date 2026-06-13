---
name: Retro66
slug: retro66
subtitle: Commissioned PCB design for the Retro66 keyboard
rev: "1"
type: commission
layout: 65%
released: "2022"
featured: false
images:
  - https://i.imgur.com/udVvOBM.jpeg
  - https://i.imgur.com/hdG81kh.jpeg
  - https://i.imgur.com/iVZftLJ.jpeg
switches:
  - mx
specs:
  firmware: QMK
  connector: USB-C Daughterboard
  mcu: ARM STM32
  rgb: None
  thickness: 1.6mm
  material: FR4
  solderMask: White
  custom:
    - key: DB Standard
      value: JST-SH
layouts:
  - svg: /layouts/retro66.svg
downloads:
  - kind: QMK Firmware
    url: https://github.com/mechlovin/PCB/blob/master/Zed65/No_LED/mechlovin_zed65_retro66_via.bin
compatibility:
  - title: Case fitment
    body: This PCB design fits the Retro66 keyboard specifically
---
