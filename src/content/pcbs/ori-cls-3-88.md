---
name: Ori CLS-3//88
slug: ori-cls-3-88
type: commission
layout: TKL
released: "2023"
featured: false
images:
  - https://i.imgur.com/EaLmjm7.png
  - https://i.imgur.com/14fJ5Tl.jpeg
  - https://i.imgur.com/B8IDVZE.png
  - https://i.imgur.com/HYa33r5.png
switches:
  - mx
specs:
  firmware: QMK
  connector: Custom USB-C Daughterboard
  mcu: ARM STM32
  rgb: None
  thickness: 1.6mm
  material: FR4
  solderMask: White
  custom:
    - key: DB Standard
      value: JST-sH
layouts:
  - svg: /layouts/ori-cls-3-88-solder.svg
    caption: ""
downloads:
  - kind: QMK Firmware
    url: https://github.com/mechlovin/PCB/blob/master/TKL%20PCB%20-%20Infinity%20Series/IF87.5/Rev1/Firmware/mechlovin_infinity875_via.hex
    description: Solder Version
  - kind: QMK Firmware & VIA JSON
    description: Hotswap Version
    url: https://github.com/mechlovin/PCB/tree/master/TKL%20PCB%20-%20Infinity%20Series/IF87.5/Rev2
compatibility:
  - title: Case fitment
    body: "This PCB design fits the Ori CLS-3//88 custom keyboard specifically. "
---
