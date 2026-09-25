---
name: ZED60 - NRD Kaze Mini
slug: zed60-derivative
subtitle: Commissioned PCB for JJW Derivative keyboard
type: commission
layout: 60%
released: "2025"
featured: false
images:
  - /images/kazeminisolder.webp
  - /images/kazeminihs.webp
switches:
  - mx
specs:
  firmware: QMK
  connector: Custom USB-C Daughterboard
  mcu: ARM STM32
  rgb: None
  thickness: 1.6mm
  material: Black core FR4
  solderMask: Red
  custom:
    - key: JST Standard
      value: JST-SUR
layouts:
  - svg: /layouts/zed60-hotswap.svg
downloads:
  - kind: Firmware
    url: https://github.com/mechlovin/PCB/tree/master/60-PCB/Zed60/Firmware
compatibility:
  - title: Fitment
    body: Specifically designed for the NRD Kaze Mini keyboard
changelog: []
---
