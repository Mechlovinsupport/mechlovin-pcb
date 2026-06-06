---
name: Saevus Duality
slug: saevus-duality
subtitle: Commissioned PCB design for the Saevus Duality keyboard
rev: Infinity 88 Rev. 3
type: commission
layout: TKL
released: "2024"
featured: false
images:
  - https://i.imgur.com/k6MkKC8.jpeg
  - https://i.imgur.com/jHPOb9O.jpeg
  - https://i.imgur.com/zvHKxPv.jpeg
  - https://i.imgur.com/wfy5b1J.jpeg
switches:
  - mx
specs:
  firmware: QMK
  connector: Unified USB-C Daughterboard
  mcu: ARM STM32
  rgb: None
  thickness: 1.6mm (Black) / 1.2mm (Red)
  material: FR4
  solderMask: Matte Black, Red
  custom:
    - key: DB Standard
      value: JST-SH
layouts:
  - svg: /layouts/saevus-duality-solder.svg
    caption: Solder Version
  - svg: /layouts/ori-cls-3-88-solder.svg
    caption: Hotswap Version
downloads:
  - kind: QMK Firmware
    url: https://github.com/mechlovin/PCB/blob/master/TKL%20PCB%20-%20Infinity%20Series/Infinity88/Rev3/mechlovin_infinity88_rev3_via.bin
compatibility:
  - title: Case fitment
    body: "This PCB design fits the Seavus Duality TKL keyboard specifically. "
---
