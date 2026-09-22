---
name: Artkey AK75
slug: artkey-ak75
subtitle: Commissioned PCB for the Artkey AK75.
rev: ZED75 RGB Rev. 1
type: commission
layout: 75%
released: "2025"
featured: false
images:
  - /images/RrAeLCk.webp
  - /images/bkTODoA.webp
switches:
  - mx
specs:
  firmware: QMK
  connector: USB-C Daughterboard
  mcu: ARM STM32
  rgb: Per-key RGB
  thickness: 1.6mm
  material: FR4
  solderMask: Matte Black
  custom:
    - key: DB Connector
      value: JST-SH
layouts:
  - svg: /layouts/artkey-ak75-solder.svg
    caption: Solder Version
  - svg: /layouts/artkey-ak75-hotswap.svg
    caption: Hotswap Version
downloads:
  - url: https://github.com/mechlovin/PCB/tree/master/Artkey/AK01
    kind: QMK Firmware & VIA JSON
compatibility:
  - title: Case fitment
    body: "This PCB design fits the Artkey AK75 keyboard specifically. "
---
