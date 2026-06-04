---
name: Olly JF
slug: olly-jf
subtitle: "Drop-in PCB for Duck Jetfire keyboard. "
rev: "2"
type: stock
layout: Full-Size
released: "2023"
featured: false
images:
  - https://i.imgur.com/n2dZ8RR.png
  - https://i.imgur.com/cwOBH0E.jpeg
switches:
  - mx
specs:
  firmware: QMK
  connector: Onboard USB-C
  mcu: ARM STM32
  rgb: Underglow
  thickness: 1.6mm
  material: FR4
  solderMask: White
layouts:
  - svg: /layouts/olly-jf.svg
downloads:
  - kind: QMK Firmware
    description: Rev. 1
    url: https://github.com/mechlovin/PCB/blob/master/Olly/JF/Firmware/Rev1/mechlovin_olly_jf_via.hex
  - url: https://github.com/mechlovin/PCB/tree/master/Olly/JF/Firmware/Rev2
    kind: QMK Firmware & VIA JSON
    description: Rev. 2
compatibility:
  - title: Case fitment
    body: This PCB design fits the Duck Jetfire specifically.
changelog:
  - current: false
    rev: Revision 1
    date: "2022"
    summary: Original version
  - current: true
    rev: Revision 2
    date: "2023"
    summary: Overall redesign with ARM STM32 MCU to improve stability
vendors:
  - name: Mechlovin'
    region: Global
    stock: in
    price: $60
    shipping: Worldwide
    url: https://mechlovin.studio/products/mechlovin-olly-duck-compatible-pcb
---
