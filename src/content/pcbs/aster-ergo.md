---
name: Aster Ergo
slug: aster-ergo
subtitle: Commission PCB for Aster Ergo keyboard
rev: "1"
type: commission
layout: Ergo
released: "2023"
featured: false
images:
  - https://i.imgur.com/qP55NQC.jpeg
  - https://i.imgur.com/4aRRUvN.jpeg
switches:
  - mx
specs:
  firmware: QMK
  connector: USB-C Daughterboard
  mcu: ARM STM32
  rgb: None
  thickness: 1.6mm
  material: FR4
  solderMask: Matte Black
  custom:
    - key: DB Standard
      value: JST-SH
layouts:
  - svg: /layouts/bahm-studio-aster-ergo.svg
downloads:
  - kind: QMK Firmware
    url: https://github.com/mechlovin/PCB/blob/master/Bahm/Aster-Ergo/bahm_aster_ergo_via.bin
compatibility:
  - title: Case fitment
    body: "This PCB was designed to fit the Aster Ergo keyboard specifically. "
---
