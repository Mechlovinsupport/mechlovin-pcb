---
name: Merisi Sessantacinque
slug: merisi-sessantacinque
subtitle: Commissioned PCB design for the Merisi Sessantacinque 65% keyboard
rev: "1"
type: commission
layout: 65%
released: "2020"
featured: false
images:
  - https://i.imgur.com/GCNMqkA.jpeg
  - https://i.imgur.com/jxy96Gc.jpeg
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
  - svg: /layouts/zed65-hotswap.svg
downloads:
  - kind: QMK Firmware
    url: https://github.com/mechlovin/PCB/blob/master/Merisi/mechlovin_hannah65_rev1_sessantacinque_via.bin
compatibility:
  - title: Case fitment
    body: This PCB design fits the Merisi Sessantacinque specifically
---
