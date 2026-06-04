---
name: LZ ErGhost
slug: lz-erghost
subtitle: Commissioned PCB for the LZ Erghost keyboard.
rev: "1"
type: commission
layout: Ergo
released: "2022"
featured: false
images:
  - https://i.imgur.com/MnuWlBb.jpeg
  - https://i.imgur.com/6f7eCs0.jpeg
switches:
  - mx
specs:
  firmware: QMK
  connector: USB-C Daughterboard
  mcu: Atmega32U4
  rgb: Underglow
  thickness: 1.6mm
  material: FR4
  solderMask: Matte Black
  custom:
    - key: DB Standard
      value: JST-SH
layouts:
  - svg: /layouts/lz-erghost.svg
downloads:
  - kind: QMK Firmware & VIA JSON
    url: https://github.com/mechlovin/PCB/tree/master/LZ/LZ-ErGhost
compatibility:
  - title: Case fitment
    body: "This PCB design fits the LZ ErGhost keyboard specifically. The onboard
      USB-C version also works with the original LZ Ergo. "
---
