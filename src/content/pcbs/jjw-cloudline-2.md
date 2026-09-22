---
name: JJW Cloudline 2
slug: jjw-cloudline-2
subtitle: Commissioned PCB design for the JJW Cloudline 2 keyboard
rev: "1"
type: commission
layout: TKL
released: "2024"
featured: false
images:
  - /images/oD8eKpw.webp
  - /images/BCMIgFL.webp
  - /images/XS8BZpo.webp
  - /images/CDQPuSI.webp
switches:
  - mx
specs:
  firmware: QMK
  connector: USB-C Daughterboard
  mcu: ARM STM32
  rgb: LED Daughterboard
  thickness: 1.6mm
  material: FR4
  solderMask: Blue-Gray
  custom:
    - key: DB Standard
      value: JST-SH
layouts:
  - svg: /layouts/jjw-cloudline-2-solderable.svg
    caption: Solder Version
  - svg: /layouts/jjw-cloudline-2-hotswap.svg
    caption: Hotswap Version
downloads:
  - kind: QMK Firmware & VIA JSON
    url: https://github.com/mechlovin/PCB/tree/master/JJW/Cloudline2
compatibility:
  - title: Case fitment
    body: "This PCB design fits the JJW Cloudline 2 TKL keyboard specifically. "
---
