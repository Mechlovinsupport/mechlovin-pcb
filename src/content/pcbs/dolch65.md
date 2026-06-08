---
name: Dolch65
slug: dolch65
subtitle: Commisisoned PCB design for the Dolch65 by Bahm Studio
rev: ZED65 Rev. 1
type: commission
layout: 65%
released: "2023"
featured: false
images:
  - https://i.imgur.com/69TQ9BH.jpeg
  - https://i.imgur.com/mmjjF5T.jpeg
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
  - svg: /layouts/gsk-tgr-910-mechlovin-zed65-solder.svg
downloads:
  - kind: QMK Firmware & VIA JSON
    url: https://github.com/mechlovin/PCB/tree/master/Zed65/Mono-LED/Dolch65
compatibility:
  - title: Case fitment
    body: This PCB design fits the Bahm Studio Dolch65 keyboard specifically
---
