---
name: ZED60 - Cleverkeebs Phi60
slug: zed60-phi60
subtitle: Commissioned PCB for Cleverkeebs Phi60 keyboard
rev: "1.2"
type: commission
layout: 60%
released: "2026"
featured: false
images:
  - /images/phi60hs.webp
  - /images/phi60solder.webp
  - /images/phi60rgb.webp
switches:
  - mx
specs:
  firmware: QMK
  connector: S1 USB-C Daughterboard
  mcu: ARM STM32
  rgb: None
  thickness: 1.6mm
  material: FR4
  solderMask: White
  custom:
    - key: JST Standard
      value: JST-SH
layouts:
  - svg: /layouts/zed60-layout.svg
    caption: Solder Version
  - svg: /layouts/zed60-hotswap.svg
    caption: Hotswap Version
downloads:
  - kind: Firmware
    url: https://github.com/mechlovin/PCB/tree/master/60-PCB/Zed60/Firmware
changelog: []
---
